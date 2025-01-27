/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  { title: "Customer Service - Cloud Video Production", location: "NZ, Auckland" },
  { title: "Commissioning Machinery Assistant (CMA)", location: "US, IA, Wever" },
  { title: "Account Executive - Washington DC", location: "US, DC, Washington" },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Completion Engineer", location: "US, CA, San Ramon" }
];

function searchJobs(title, location) {
  const titleLower = title.toLowerCase();
  const locationLower = location.toLowerCase();

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(titleLower) &&
    job.location.toLowerCase().includes(locationLower)
  );

  return {
    result: filteredJobs,
    count: filteredJobs.length
  };
}

function handleSearch() {
  const title = document.getElementById("jobTitle").value;
  const location = document.getElementById("jobLocation").value;

  console.log("Titolo cercato:", title);
  console.log("Location cercata:", location);

  const searchResult = searchJobs(title, location);

  console.log("Risultati trovati:", searchResult);

  const resultsList = document.getElementById("risultati");
  resultsList.innerHTML = ""; // pulire

  if (searchResult.result.length === 0) {
    resultsList.innerHTML = "<li>Nessun risultato trovato</li>";
  } else {
    for (const job of searchResult.result) {
      const li = document.createElement("li");
      li.textContent = `${job.title} - ${job.location}`;
      resultsList.appendChild(li);
    }
  }
}

