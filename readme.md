## Oppgave 1. Vindmølle

Denne øvingen går ut på å få et 3D-objekt til å flytte seg. Selv om det ikke vil se ut som film, så kan prinsippet brukes for å lage film (ved å avfotografere hvert bilde og deretter spille av filmen, så vil ikke "oppdateringene" synes).

Lag en vindmølle som i prinsipp er oppbygd med et fundament og tre blader(vinger). I denne oppgaven skal vi i stedet for å modellere vindmøllen manuelt, ved å spesifisere hver enkeltflate slik som vi gjorde i oppgave 9, bruke 3DStudio Max til å modellere en vinge samt et fundament for vindmøllen. Bruk gjerne litt fantasi i utformingen av vingen og fundamentet.

## Oppgave 2. Styrt bevegelse av vindmøllebladene

Etter at vindmøllen er koblet sammen skal vindmøllebladene rotere med variabel hastighet. Tenk nøye gjennom hvilken skala samt langs hvilken akse du plasserer objektene i 3D Studio før de eksporteres til Collada formatet som Three.js kan importere.

Vi skal for innlastning av 3D modeller fra 3DStudio bruke et bibiliotek som heter "ColladaLoader.js" som du finner sammen med de øvrige JavaScript bibliotekene som Joe Dirksen har samlet på GitHub.

Eksempler på innlastning av modeller hentet fra løsningsantydningen:

```javascript
var blad1 = createObject("Blad.dae", "test");
var blad2 = createObject("Blad.dae", "blad2");
var blad3 = createObject("Blad.dae", "blad3");

var fundament = createObject("Fundament.dae", "fundament");
function createObject(objFile, objName) {
    var container = new THREE.Object3D();
    var loader = new THREE.ColladaLoader();
    var mesh = new THREE.Mesh;
    loader.load(objFile, function (result) {
        mesh = result.scene.children[0].children[0].clone();
        //mesh.scale.set(0.1, 0.1, 0.1);
        mesh.castShadow = true;
        mesh.name = objName;
        container.add(mesh);
    });
    return container;
}
```

## Oppgave 3 Frivillig ekstraoppgave

Se om du i tillegg til å variere rotasjonshastigheten også kan variere vinkelen til bladene når de roterer.

Godkjenningsfrist 09 November 2018