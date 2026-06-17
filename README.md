# PCF Report Builder

Una aplicació web que genera informes de l'empremta de carboni en PDF, a partir de dades en format CSV.

## Què he triat i per què: Barreja de Path A i Path B (lo més essencial)

**Per què Path A?** Vaig preferir fer algo petit i ben fet en lloc de fer molt però malament. Tenint en compte el timing tampoc he pogut fer res gaire ambiciós, si l'objectiu era conéixer el meu codi al 100% hagués estat una tasca molt més difícil. Tot funciona i ho entenc al 100% que era lo que es demanava sobre tot a la prova.

**Les opcions que havia:**
- **Path A**: Llegir CSV, validar dades, fer un PDF amb gràfics i números. FET.
- **Path B**: Deixar que el client canviï colors i format. Més o menys, ja que he implementat que amb el canvi de client hi hagi un canvi de colors automáticament.
- **Path C**: Intel·ligència artificial per millorar l'informe. Massa complicat, no val la pena per aquesta prova tenint en compte el timing, tot i que era una opció que m'encantava.

---

## Què he fet

**Com llegeixo les dades:**
- Agafo un arxiu CSV (com un Excel).
- El programa el llegeix fila per fila.

**Com faig l'informe en PDF:**
- Página 1: Portada amb el nom del producte, el total de carboni, data.
- Página 2: Taula amb les 6 fases (Materials, Fabricació, Transport, Distribució, Ús, Final de vida) i un gràfic.
- Página 3: Taula detallada amb tots els números petits.

**La web:**
- Página principal: benvinguda i botó "Começar".
- Login: la pàgina de login es un mock, no cal posar res, si prems el botó de login ja t'envia a la taula de dades.
- Tauler: mostra una vista prèvia del CSV i un botó per descarregar el PDF.
- Colors: tot segueix la identitat visual de Mappa (rosa, taronja, blau) i també una mica el patró de la pròpia pàgina de Mappa.

---

## Tecnologies que he fet servir

**Framework** Next.js. Fàcil de fer webs, bona per servidors (Tot i que no l'havia fet servir gaire abans, penso que és important fer la prova amb next, ja que es la tecnología que feu servir).
**Llenguatge** JavaScript. Obligatori per la prova, a més és simple, no cal configurar tant.
**PDF** @react-pdf/renderer. Faig el PDF des del mateix codi, sense complicacions. A més és la llibrería més usada a react per generar PDF.
**Validació** Zod. Comprova que les dades siguin correctes, proposada al enunciat del repte.
**Estils** Tailwind CSS. Colors i marges automàtics, no cal canviar settings. També proposada al enunciat.
**Botons** shadcn/ui. Botons bonics ja fets, nomes copia i enganxa. Proposada a l'enunciat.

La majoría de tecnologíes que he escollit les he escollit per comoditat ja que son eines que ja he fet servir abans.

---

## Què hauria fet amb més temps

### Fase 2: Deixar que es canviï tot
- Triar entre diferents marques/colors.
- Pujar el teu propi CSV.
- Canviar noms, dates, etc. manualment.
- Escollir si vols 1 pàgina o 3.
- Complir amb el PATH C, ja que com vaig comentar a l'entrevista, tot el que sigui desenvolupar a l'entorn d'una IA em sembla molt interessant i atractiu.
- Posar el logo real de Mappa.
- Fer servir la lletra BDO Grotesk en lloc de Helvetica.
- Guardar informes en un servidor(Acabar tota la part de supabase).
- Veure el PDF mentre canvies opcions.
- Mostrar errors amables si el CSV va malament(En general millorar la UX i la Accessibilitat).

---

## Temps que vaig invertir i com vaig fer servir la IA

**Total: unes 7-8 hores.**

**Aproximat:**
- Mirar tots els arxius i l'enunciat i entendre-ho: 1 hora.
- Escriure el codi que llegeix el CSV: 45 min.
- Fer el PDF amb els gràfics: 2 hores.
- Retocar la web (botons, colors): 1 hora.
- Provar i arreglar errors: 1 hora.

**Què vaig deixar que la IA fés:**
- Fer l'estructura principal d'arxius (Tot i que l'organització la vaig deixar clara jo desde un primer moment).
- Fer el primer disseny de la pàgina (Per a aquesta part he fet servir unes skills que es diuen ui-ux-pro-max, que ajuden molt a conseguir un resultat molt més pulit per part de Claude)
- Fer el gràfic (línies i colors).
- Els colors del degradat.
- Com llegir el CSV sense errors.
- La configuració dels colors de marca.
- Connectivitat amb Supabase (Per falta de temps, tot i que al final no he aconseguit acabar aquesta part per poc.)
- La part de Next.js ja que soc bastant nou en aquest framework i em semblava poc realista aprendre i aplicar Next.js en una sola setmana d'una manera professional.
- Part técnica del README.

**Què vaig escriure jo:**
- En quina pàgina va cada cosa del PDF.
- Com saber si els números són correctes o no.
- El disseny final de la pàgina.
- Com connectar tot plegat (servidor, client).
- Arreglar bugs (números mal mapeats, pàgines que no cabien, fonts, sintaxis...).
- La validació amb zod.
- La instalació de llibreries, skills, etc...


**Eines que vaig usar:**
- Claude (arquitectura, lògica, com fer funcionar Zod i el PDF).
- GitHub Copilot (autocompletar mentre escrivia).
- Documentació/videos de Next.js i de reactpdf.

---

## Com executar-ho

```bash
npm install
npm run dev
```

Obriu [http://localhost:3000](http://localhost:3000). Cliqueu "Começar" o aneu a `/dashboard` per veure el CSV i descarregar el PDF.

**Per a producció:**
```bash
npm run build
npm start
```
