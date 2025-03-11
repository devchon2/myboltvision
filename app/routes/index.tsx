import { json } from "@remix-run/cloudflare";

// Ce fichier sert de point d'entrée alternatif pour contourner les problèmes de routing
export const loader = async () => {
  return json({ message: "Application chargée avec succès" });
};

export default function Index() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>MyBoltVision</h1>
      <p>L'application est en cours de chargement...</p>
      <p>Si cette page persiste, veuillez vérifier la console pour les erreurs.</p>
    </div>
  );
}
