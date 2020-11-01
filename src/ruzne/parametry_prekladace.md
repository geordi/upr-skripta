# Parametry překladače
Překladač `gcc` obsahuje sadu několika stovek parametrů, pomocí kterých můžeme ovlivnit, jak překlad
programu proběhne. Můžeme například určit, pro jaký procesor se mají vygenerovat instrukce, jakou
variantu jazyka *C* má překladač očekávat nebo jestli má náš program zoptimalizovat, aby běžel
rychleji.

> Kromě `gcc` existuje řada dalších překladačů *C*, například [`clang`](https://clang.llvm.org/).
> Nejčastější parametry (jako je např. `-O`) obvykle fungují ve všech překladačích obdobně, každý
> překladač ale obsahuje sadu specifických parametrů, které můžete naleznout v jeho
> [dokumentaci](https://clang.llvm.org/docs/ClangCommandLineReference.html).

Seznam všech parametrů můžete naleznout v
[dokumentaci `gcc`](https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html), zde je uveden seznam
nejužitečnějších parametrů:
- *Optimalizace*: Existuje spousta parametrů, pomocí kterých můžete ovlivnit, jak překladač převede
váš zdrojový kód na strojové instrukce a jak je zoptimalizuje. Nejzákladnějším parametrem je `-O`:
    - `-O0` - nebudou použity téměř žádné optimalizace. Toto je implicitní nastavení,
    pokud ho nezměníte. Program v tomto stavu lze dobře [krokovat](../prostredi/ladeni.md#krokování),
    ale může být dost pomalý.
    - `-O1` - aplikuje základní optimalizace.
    - `-O2` - aplikuje nejužitečnější optimalizace. Pokud chcete získat rozumně rychlý program,
    doporučujeme použít tento mód. Díky němu může být program třeba až 1000x rychlejší než s `-O0`.[^1]

    - `-O3` - aplikuje ještě více optimalizací. Program tak může být ještě rychlejší než s `-O2`.
    Obecně při použití optimalizací však platí, že čím vyšší optimalizační stupeň, tím více hrozí,
    že se váš program přestane chovat správně, pokud program obsahuje jakékoliv
    [nedefinované chování](../c/promenne/promenne.md#vždy-inicializujte-proměnné). Je tak třeba dávat
    pozor na to, aby k tomu nedošlo.

    Kromě parametru `-O` lze použít spousty dalších parametrů, které ovlivňují například použití
    [vektorových instrukcí](../c/co_dal.md). O těch se dozvíte více například v předmětu
    [Programování v C++](https://edison.sso.vsb.cz/cz.vsb.edison.edu.study.prepare.web/SubjectVersion.faces?version=460-2068/01&subjectBlockAssignmentId=369400&studyFormId=1&studyPlanId=21821&locale=cs&back=true).
- *Ladění programu*:
    Jak už jste jistě poznali, při použití jazyka *C* je velmi jednoduché způsobit nějaké nedefinované
    chování, například nějakou [paměťovou chybou](../caste_chyby/pametove_chyby.md). Aby šlo tyto
    chyby detekovat, obsahují překladače tzv. *sanitizery*. Při použití sanitizeru se do vašeho
    programu přidají dodatečné instrukce, které poté při běhu programu kontrolují, jestli nedochází
    k nějakému problému. Cenou za tuto kontrolu je pomalejší běh programu (cca 2-5x). Sanitizery tak
    raději používejte pouze při vývoji programu.

    Existuje více [typů sanitizerů](https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html),
    my si ukážeme dva:
    - `-fsanitize=address` - použije tzv. *Address Sanitizer*, který hlídá paměťové chyby, například
    přístup k nevalidní paměti nebo neuvolnění [dynamické paměti](../c/prace_s_pameti/dynamicka_pamet.md).
    Tento sanitizer je nesmírně užitečný a doporučujeme ho používat při vývoji automaticky.
    - `-fsanitize=undefined` - použije tzv. *Undefined behaviour sanitizer*, který hlídá dodatečné
    situace, při kterých může dojít k nedefinovanému chování (kromě paměťových chyb).

    Obecně při ladění programu je taky vhodné vždy použít přepínač `-g`. Ten způsobí, že překladač
    přidá do výsledného spustitelného souboru informace o zdrojovém kódu (ty jinak ve spustitelném
    souboru chybí). Díky tomu budou sanitizery schopny zobrazit konkrétní řádek, na kterém vznikl
    nějaký problém a také půjde program ladit a krokovat. 
- *Analýza kódu*: Kromě sanitizerů, které kontrolují váš program za běhu, lze také spoustu chyb
odhalit již při překladu programu. Bohužel překladač `gcc` v implicitním módu není moc striktní a
některé vyloženě chybné situace vám promine a program přeloží, i když je již dopředu jasné, že při
běhu pak dojde např. k pádu programu. Abychom tomu předešli, můžeme zapnout při překladu dodatečná
**varování** (*warnings*), která nás mohou na potenciálně problematické situace upozornit:
    - `-Wall` - zapne sadu několika desítek základních varování.
    - `-Wextra` - zapne dodatečnou sadu varování.
    - `-pedantic` - zapne striktní kontrolu toho, že dodržujete předepsaný standard *C*. V kombinaci
    s tímto přepínačem byste také měli explicitně říct, který standard chcete použít. V UPR používáme
    standard *C99*, který lze zadat pomocí `-std=c99`.
    - `-Werror` - tento přepínač způsobí, že libovolné varování bude vnímáno jako chyba. Pokud tak
    v programu `gcc` nalezne jakékoliv varování, program se nepřeloží.

    Pokud chcete mít při překladu co největší zpětnou vazbu od překladače a zajistit co největší
    "bezpečnost" vašeho programu, doporučujeme používat tuto kombinaci přepínačů:
    ```bash
    $ gcc -g -fsanitize=address -Wall -Wextra -pedantic -std=c99
    ```

[^1]: Anebo nemusí být rychlejší vůbec, záleží na programu.
