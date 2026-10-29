import { useState } from "react";
function Facture({ clients, produits, achats }) {
  const [numero, setNumero] = useState("");
  const [clientRecherche, setClientRecherche] = useState(null);
  const [erreur, setErreur] = useState("");
  function getProduitByCode(code) {
    return produits.find((p) => p.codeProduit === code);
  }
  function rechercher() {
    const client = clients.find((c) => c.numero === numero);
    if (!client) {
      setClientRecherche(null);
      setErreur("Ce numéro de client n'existe pas.");
      return;
    }
    setClientRecherche(client);
    setErreur("");
  }
  const achatsClient = achats.filter(
    (achat) => achat.numero === numero
  );
  const totalFacture = achatsClient.reduce((total, achat) => {
    const produit = getProduitByCode(achat.codeProduit);

    return total + (produit ? produit.prix * achat.qte : 0);
  }, 0);
  return (
    <div>
      <h2>Facture client</h2>

      <input
        type="text"
        placeholder="Numéro du client"
        value={numero}
        onChange={(e) => {
          setNumero(e.target.value);
          setClientRecherche(null);
          setErreur("");
        }}
      />
      <button onClick={rechercher}>Rechercher</button>
      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      {clientRecherche && (
        <div>
          <h3>
            Client : {clientRecherche.nom} {clientRecherche.prenom}
          </h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Code produit</th>
                <th>Intitulé</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {achatsClient.map((achat, index) => {
                const produit = getProduitByCode(achat.codeProduit);
                if (!produit) return null;
                return (
                  <tr key={index}>
                    <td>{produit.codeProduit}</td>
                    <td>{produit.intitule}</td>
                    <td>{achat.qte}</td>
                    <td>{produit.prix} DH</td>
                    <td>{produit.prix * achat.qte} DH</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3>Total de la facture : {totalFacture} DH</h3>
        </div>
      )}
    </div>
  );
}
export default Facture;