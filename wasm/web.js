/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let term;
let api;

window.addEventListener('load', () => {
  document.querySelectorAll('pre .buttons').forEach(el => {
    let container = el.closest('pre');
    let editorEl = container.querySelector('.ace_editor');
    if(!editorEl) {
      return;
    }
    let editor = editorEl.env.editor;
    let localTerm;

    const run = debounceLazy(async () => {
      initOrMoveTerm();
      localTerm.clear();
      await api.compileLinkRun(editor.getValue());
    }, 100);

    editor.commands.addCommand({
      "name": "save",
      "bindKey": "Ctrl-Enter",
      "exec": run,
    });
    editor.getSession().setMode("ace/mode/c_cpp");


    const initOrMoveTerm = () => {
      if(!term) {
        api = new WorkerAPI();
      }

      if(!localTerm) {
        termEl = document.createElement('div');
        container.appendChild(termEl);
        localTerm = new Terminal({
          convertEol: true,
          disableStdin: true,
          fontSize: 18
        });
        localTerm.open(termEl);
        localTerm.fit();
        term = localTerm;
      }
    };

    let btn = document.createElement('button')
    btn.classList.add('fa');
    btn.classList.add('fa-play');
    btn.onclick = () => run();
    el.insertBefore(btn, el.firstChild);
  });
});

Terminal.applyAddon(fit);

class WorkerAPI {
  constructor() {
    this.nextResponseId = 0;
    this.responseCBs = new Map();
    this.worker = new Worker('/wasm/worker.js');
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = this.onmessage.bind(this);

    const remotePort = channel.port2;
    this.worker.postMessage({id: 'constructor', data: remotePort},
                            [remotePort]);
  }

  terminate() {
    this.worker.terminate();
  }

  async runAsync(id, options) {
    const responseId = this.nextResponseId++;
    const responsePromise = new Promise((resolve, reject) => {
      this.responseCBs.set(responseId, {resolve, reject});
    });
    this.port.postMessage({id, responseId, data : options});
    return await responsePromise;
  }

  async compileLinkRun(contents) {
    this.port.postMessage({id: 'compileLinkRun', data: contents});
  }

  onmessage(event) {
    switch (event.data.id) {
      case 'write':
        term.write(event.data.data);
        break;

      case 'runAsync': {
        const responseId = event.data.responseId;
        const promise = this.responseCBs.get(responseId);
        if (promise) {
          this.responseCBs.delete(responseId);
          promise.resolve(event.data.data);
        }
        break;
      }
    }
  }
}
