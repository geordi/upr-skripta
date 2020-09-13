# Složený zápis
Často potřebujeme hodnotu proměnné pouze trochu poupravit, a ne do ní vyloženě zapsat novou hodnotu.
Běžná je například operace zvýšení hodnoty proměnné o `1` (tzv. **inkrementace** proměnné).
K tomu můžeme použít tento příkaz:
```c
count = count + 1; // zvýšení hodnoty proměnné `count` o 1
```
nicméně to je docela zdlouhavé. Proto *C* nabízí tzv. operátory **složeného zápisu** (*compound
assignment*). Tyto operátory jsou spojené z normálního operátoru (např. `+`) a operátoru `=`:
`+=`, `-=`, `*=`, atd. Složený zápis
```c
<proměnná> <operátor>= <výraz>;
```
je ekvivalentní příkazu
```c
<proměnná> = <proměnná> <operátor> <výraz>;
```

Například:
```c
int count = 0;
count += 1;   // stejné jako count = count + 1;
count *= 3;   // stejné jako count = count * 3; 
```

### Inkrementace a dekrementace
Speciálním případem složeného zápisu je tzv. **inkrementace** (zvýšení hodnoty proměnné o jedničku)
a **dekrementace** (snížení hodnoty proměnné o jedničku). Tyto operace jsou tak časté, že *C* obsahuje
speciální "zkratky" pro jejich provedení. Aby to nebylo tak jednoduché, tak tyto zkratky
existují ve dvou variantách:
- *Postfixová*: `<proměnná>++`. Tento výraz se vyhodnotí jako hodnota dané proměnné, a **poté** zvýší
hodnotu proměnné o jedničku. Zkuste uhodnout, co vypíše následující program:
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int a = 1;
        int b = a++;
        printf("%d\n", a);
        printf("%d\n", b);
    
        return 0;
    }
    ```
- *Prefixová*: `++<proměnná>`. Tento výraz **nejprve** zvýší hodnotu proměnné, a až poté se vyhodnotí
jako (nová, již zvýšená) hodnota dané proměnné. Zkuste uhodnout, co vypíše následující program:
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int a = 1;
        int b = ++a;
        printf("%d\n", a);
        printf("%d\n", b);
    
        return 0;
    }
    ```

Dekrementace se chová totožně jako inkrementace, pouze s tím rozdílem, že snižuje hodnotu
proměnné o `1` a místo `++` používá `--`.

Tyto zkratky jsou sice užitečné, ale také můžou vyústit v překvapivé chování díky způsobu, kterým
jsou vyhodnocovány. Ze začátku je radši využívejte pouze v situacích, kdy budou použity jako příkaz,
který změní hodnotu proměnné. Jinak řečeno, raději se moc nespoléhejte na hodnotu, ve kterou se
inkrementace/dekrementace vyhodnotí.
