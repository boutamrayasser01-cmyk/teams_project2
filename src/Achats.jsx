import { useState } from "react";
function Achats({clients,produits,achats,ajouterAchat,supprimerAchat
}) {
  const [numero, setNumero] = useState("1");
  const [codeProduit, setCodeProduit] = useState("1");
  const [qte, setQte] = useState(1);
  const [filtre, setFiltre] = useState("");
  function ajouter() {
    if (Number(qte) <= 0 || qte === "") {
      alert("Quantité invalide");
      return;
    }
    ajouterAchat({numero,codeProduit,qte: Number(qte)});
    setQte(1);
  }
  const achatsFiltres = achats.filter((achat) =>
    achat.numero.includes(filtre)
  );
  return (
    <div>
      <h2>Saisie des achats</h2>
      <label>Client :</label>
      <select
        value={numero}
        onChange={(e) => setNumero(e.target.value)}  >
        {clients.map((client) => (
          <option key={client.numero} value={client.numero}>
            {client.numero} - {client.nom} {client.prenom}
          </option>
        ))}
      </select>
      <br />
      <label>Produit :</label>
      <select
        value={codeProduit}
        onChange={(e) => setCodeProduit(e.target.value)}
      >
        {produits.map((produit) => (
          <option
            key={produit.codeProduit}
            value={produit.codeProduit}
          >
            {produit.intitule} - {produit.prix} DH
          </option>
        ))}
      </select>
      <br />
      <label>Quantité :</label>
      <input
        type="number"
        min="1"
        value={qte}
        onChange={(e) => setQte(e.target.value)}
      />
      <button onClick={ajouter}>Ajouter</button>
      <hr />
      <h3>Filtrer les achats</h3>
      <input
        type="text"
        placeholder="Numéro du client"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
      />
      <button onClick={() => setFiltre(filtre.trim())}>
        Filtrer
      </button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Client</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {achatsFiltres.map((achat) => {
            const produit = produits.find(
              (p) => p.codeProduit === achat.codeProduit
            );
            const index = achats.indexOf(achat);
            return (
              <tr key={index}>
                <td>{achat.numero}</td>
                <td>{produit?.intitule}</td>
                <td>{achat.qte}</td>
                <td>{produit?.prix} DH</td>
                <td>{produit ? produit.prix * achat.qte : 0} DH</td>
                <td>
                  <button onClick={() => supprimerAchat(index)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Achats;