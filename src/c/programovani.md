# Programování v *C*
V této kapitole naleznete popis základních konstrukcí jazyka *C*, které jsou základními
stavebními kameny pro tvorbu programů. Ke každému tématu je k dispozici také sada úloh. Pokud úlohy
zvládnete vypracovat, tak budete mít jistotu, že jste dané téma pochopili a můžete se posunout dále.
Pokud nezvládnete úlohy splnit, tak můžete mít s navazujícími koncepty problém. Pokud nebudete stíhat,
tak kontaktujte svého cvičícího.

Před přečtením této kapitoly si nejprve přečtěte předchozí kapitoly, zejména sekci o
[paměti](../uvod/pamet.md).

Níže je přibližný seznam témat, které si během semestru ukážeme. Pořadí témat probíraných na cvičení
a přednáškách se může od tohoto seznamu lišit, tento text je určen spíše jako "kuchařka", ve které
se můžete k jednotlivým tématům vracet, abyste si je připomněli. Text je nicméně psaný tak, aby se
dal zhruba číst v uvedeném pořadí bez toho, aby používal pojmy, které zatím nebyly vysvětleny.

## Základní témata
- [Syntaxe](syntaxe.md) - jak vypadá syntaxe (způsob zápisu) jazyka *C*
- [Příkazy a výrazy](prikazy_vyrazy.md) - jak provádět výpočty
- [Proměnné](promenne/promenne.md) - jak něco uložit a načíst z paměti
- [Datové typy](datove_typy/datove_typy.md) - jak interpretovat hodnoty v paměti
- [Řízení toku](rizeni_toku/rizeni_toku.md) - jak se rozhodovat a provádět akce opakovaně
- [Funkce](funkce/funkce.md) - jak opakovaně využít a parametrizovat opakující se kód
- [Ukazatele](prace_s_pameti/ukazatele.md) - jak sdílet data v paměti a pracovat s adresami
- [Pole](pole/pole.md) - jak jednotně pracovat s velkým množstvím dat
- [Text](text/text.md) - jak v programech pracovat s textem
- [Struktury](struktury/vlastni_datove_typy.md) - jak vytvořit vlastní datové typy
- [Soubory](soubory/soubory.md) - jak číst a zapisovat soubory
- [Modularizace](modularizace/modularizace.md) - jak rozdělit program do více zdrojových souborů
- [Knihovny](modularizace/knihovny.md) - jak využít existující kód od jiných programátorů

Všechny tyto koncepty jsou velmi univerzální a v tzv. [imperativních](https://cs.wikipedia.org/wiki/Imperativn%C3%AD_programov%C3%A1n%C3%AD)
programovacích jazycích jsou v podstatě všudypřítomné. Jakmile se je jednou naučíte, tak je budete
moct využívat téměř v libovolném populárním programovacím jazyku (Java, C#, Kotlin, Python, PHP,
Javascript, Rust, C++ atd.). 

## Navazující aplikovaná témata
- [TGA](aplikovane_ulohy/tga.md) - jak vytvořit obrázek
- [GIF](aplikovane_ulohy/gif.md) - jak vytvořit animaci
- [SDL](aplikovane_ulohy/sdl.md) - jak vytvořit interaktivní grafickou aplikaci či hru
- [Chipmunk](aplikovane_ulohy/chipmunk.md) - jak simulovat fyzikální procesy

## Struktura textu
V textu se občas budou objevovat krátké sekce nazvané **Cvičení** 🏋️ a **Kvízy** 🤔. Ty obsahují krátká
zadání, která slouží k tomu, abyste si vyzkoušeli nějakou konstrukci jazyka *C* anebo se zamysleli nad
tím, jak daná konstrukce funguje. Další úlohy k procvičení také naleznete v kapitole [Úlohy](../ulohy).

Některé sekce jsou dále označené jako doplňující učivo 🤓. Tyto sekce označují učivo, které není
nezbytně nutné zcela pochopit, abyste se mohli v textu posunout dále. Pokud nebudete stíhat nebo toho
na vás bude moc, můžete tyto sekce prozatím přeskočit, nicméně později byste se k nim měli vrátit.

**Pouze si o programování číst nestačí k tomu, abyste se naučili programovat, proto vám doporučujeme,
abyste si co nejvíce cvičení, kvízů a úloh vypracovali.**
