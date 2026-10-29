import { useState, useEffect } from "react";
import Achats from "./Achats";
import Facture from "./Facture";
const clients = [
  { numero: "1", nom: "N1", prenom: "P1" }
];
const produits = [
  { codeProduit: "1", intitule: "Produit1", prix: 10 },
  { codeProduit: "2", intitule: "Produit2", prix: 20 },
  { codeProduit: "3", intitule: "Produit3", prix: 30 }
];
const achatsInitial = [
  { numero: "1", codeProduit: "1", qte: 5 }
];
function App() {
  const [achats, setAchats] = useState(achatsInitial);
  const [page, setPage] = useState("achats");
  function ajouterAchat(achat) {
    setAchats([...achats, achat]);
  }
  function supprimerAchat(index) {
    setAchats(achats.filter((achat, i) => i !== index));
  }
  useEffect(() => {
    document.title = `Achats : ${achats.length}`;
  }, [achats]);
  return (
    <div>
      <h1>Gestion des achats</h1>
      <button onClick={() => setPage("achats")}>
        Achats
      </button>
      <button onClick={() => setPage("facture")}>
        Facture
      </button>
      {page === "achats" ? (
        <Achats
          clients={clients}
          produits={produits}
          achats={achats}
          ajouterAchat={ajouterAchat}
          supprimerAchat={supprimerAchat}
        />
        
      ) : (
        <Facture clients={clients} produits={produits} achats={achats} />
      )}
    </div>
  );
}
export default App;
