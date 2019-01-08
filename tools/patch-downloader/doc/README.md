# Just notes about patch-downloader

## Patches per "DRIVE module"
grep '<Module4' -A 2 -r ./out/ | grep Prm1 \| 
	xs-sed -E 's;</?Prm1>;;g' | xs-sed -E "s;-\s+([0-9]+);\t\1;" | cut -f2 | cnt

## Patches using "PV Drive"
$ grep '<Module4' -A 2 -r ./out | grep "Prm1>7<" | cut -d'/' -f4 | sort -u

## By Version

$ grep '<Version' -r out/ | cut -d">" -f2 | cut -d"<" -f1 | cnt
 734 1.10
 164 1.13
  61 1.11
  43 1.01
  41 1.04
  36 1.03
  13 1
   3 1.06
   1 Versao
   1 2.00
   1 1.12