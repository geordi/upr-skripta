# Dynamická paměť
Už víme, že pomocí [automatické paměti](automaticka_pamet.md) na zásobníku nemůžeme alokovat
velké množství paměti a nemůžeme ani alokovat paměť s dynamickou velikostí (závislou na velikosti
vstupu programu). Abychom tohoto dosáhli, tak musíme použít jiný mechanismus alokace paměti, ve
kterém paměť alokujeme i uvolňujeme manuálně.

Tento mechanismus se nazývá **dynamická alokace paměti** (*dynamic memory allocation*). Pomocí několika
funkcí standardní knihovny *C* můžeme naalokovat paměť s libovolnou velikosti. Tato paměť je
alokována v oblasti paměti zvané **halda** (*heap*). Narozdíl od zásobníku, prvky na haldě neleží
striktně za sebou, a lze je tak uvolňovat v libovolném pořadí. Můžeme tak naalokovat paměť libovolné
velikosti, která přežije i ukončení vykonávání funkce, díky čemuž tak můžeme sdílet (potenciálně velká)
data mezi funkcemi. Nicméně musíme také tuto paměť ručně uvolňovat, protože (narozdíl od zásobníku)
to za nás nikdo neudělá.

## Alokace paměti
K naalokování paměti můžeme použít funkci [`malloc`](https://devdocs.io/c/memory/malloc) (*memory
alloc*), která je dostupná v souboru `stdlib.h` ze [standardní knihovny *C*](../funkce/stdlib.md).
Tato funkce má následující signaturu[^1]:
```c
void* malloc(size_t size);
```

[^1]: Datový typ [`size_t`](https://devdocs.io/c/types/size_t) reprezentuje bezznaménkové
celé číslo, do kterého by měla jít uložit velikost největší možné hodnoty libovolného typu. Často
se používá pro indexaci [polí](../pole/pole.md).

Parametr `size` udává, kolik bytů paměti se má naalokovat. Tuto velikost můžeme "tipnout"
manuálně, nicméně to není moc dobrý nápad, protože bychom si museli pamatovat velikosti datových
typů (přičemž jejich velikost se může lišit v závislosti na použitém operačním systému či
překladači!). Abychom tomu předešli, tak můžeme použít výraz `sizeof`, kterému můžeme předat datový
typ[^2] a tento výraz se poté vyhodnotí jako velikost daného datového typu:
```c,editable,mainbody
#include <stdio.h>
int main() {
    printf("Velikost int je: %d\n", sizeof(int));
    printf("Velikost int* je: %d\n", sizeof(int*));
    return 0;
}
```

[^2]: Případně výraz, v tom případě si `sizeof` vezme jeho datový typ.

Návratový typ `void*` reprezentuje ukazatel na libovolná data. Funkce `malloc` musí fungovat pro
alokaci libovolného datového typu, proto musí mít návratový typ právě univerzální ukazatel `void*`.
Při zavolání funkce `malloc` bychom měli tento návratový typ
[přetypovat](../datove_typy/celociselne_typy.md#explicitní-konverze) na ukazatel na datový typ,
který alokujeme.

Při zavolání `malloc`u dojde k naalokování `size` bytů na haldě. Adresa prvního bytu této
naalokované paměti se poté vrátí jako návratová hodnota `malloc`u. Zde je ukázka programu, který
naalokuje paměť pro jeden `int` ve funkci, adresu naalokované paměti poté vrátí jako návratovou
hodnotu a naalokovaná paměť je poté přečtena ve funkci `main`:
```c,editable
#include <stdlib.h>

int* allocate() {
    int* memory = (int*) malloc(sizeof(int));
    *memory = 5;
    return memory; 
}
int main() {
    int* memory = allocate();
    printf("%d\n", *memory);
    return 0;
}
```

### Iniciální hodnota paměti
Stejně jako u [lokálních proměnných](../promenne/promenne.md#vždy-inicializujte-proměnné) platí, že
hodnota naalokované paměti je nedefinovaná. Než se tedy hodnotu dané paměti pokusíte přečíst, musíte
jí nainicializovat zápisem nějaké hodnoty! Jinak bude program obsahovat nedefinované chování 💣.

Pokud byste chtěli, aby naalokovaná paměť byla rovnou při alokaci vynulována (všechny byty
nastavené na hodnotu `0`), můžete místo funkce `malloc` použít funkci
[`calloc`](https://devdocs.io/c/memory/calloc)[^3].

Případně můžete použít užitečnou funkci [`memset`](https://devdocs.io/c/string/byte/memset), která
vám vyplní blok paměti zadaným bytem.

[^3]: Pozor však na to, že tato funkce má jiné parametry než `malloc`. Očekává počet hodnot, které
se mají naalokovat, a velikost každé hodnoty.

## Uvolnění paměti
S velkou mocí přichází i velká [zodpovědnost](https://citaty.net/citaty/1957976-stan-lee-s-velkou-moci-prichazi-velka-odpovednost/),
takže při použití dynamické paměti sice máme více možností než při použití zásobníku, ale zároveň
**MUSÍME** tuto paměť korektně uvolňovat (což se u automatické paměti provádělo automaticky). Pokud
bychom totiž paměť neustále pouze alokovali a neuvolňovali, tak by nám
[brzy došla](../../caste_chyby/pametove_chyby.md#memory-leak).

Abychom paměť naalokovanou pomocí funkcí `malloc` či `calloc` uvolnili, tak musíme použít funkci
`free`:
```c,editable
#include <stdlib.h>

int main() {
    int* p = (int*) malloc(sizeof(int)); // alokace paměti
    *p = 0;                              // použití paměti
    free(p);                             // uvolnění paměti

    return 0;
}
```

Jako argument této funkci musíme předat ukazatel navrácený z volání `malloc`/`calloc`. Nic jiného
do této funkce nedávejte, uvolňovat můžeme pouze dynamicky alokovanou paměť! Nevolejte `free` s
adresami např. lokálních proměnných[^4].

[^4]: Je však bezpečné uvolnit "nulový ukazatel", tj. `free(NULL)` je validní (v tomto případě funkce nic neudělá).

Jakmile se paměť uvolní, tak už k této paměti nesmíte přistupovat! Pokud byste se pokusili přečíst
nebo zapsat uvolněnou paměť, tak dojde k nedefinovanému chování 💣. Nesmíte ani paměť uvolnit více
než jednou.

Při práci s dynamickou (manuální) pamětí tak dbejte zvýšené opatrnosti a ideálně používejte při
vývoji [Address sanitizer](../../prostredi/ladeni.md#address-sanitizer). (Neúplný) seznam věcí,
které se můžou pokazit, pokud kombinaci manuální alokace a uvolňování paměti pokazíte, naleznete
[zde](../../caste_chyby/pametove_chyby.md).

## Alokace více hodnot zároveň
Jak jste si mohli všimnout ze signatury funkce `malloc`, můžete jí dát libovolný počet bytů.
Nemusíte se tak omezovat velikostí základních datových typů, můžete například naalokovat paměť pro
5 `int`ů zároveň, které poté budou ležet za sebou v paměti a bude tak jednoduché k nim přistupovat
v cyklu. Jak tento koncept funguje se dozvíte v sekci o
[dynamických polích](../pole/dynamicke_pole.md).
