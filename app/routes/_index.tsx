import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Retourner au minimum un objet vide si vous n'avez pas besoin de données
  return json({ status: "ok" });
};

export default function Index() {
  // Votre composant de page ici
  return (
    <div>
      <h1>Page d'accueil</h1>
    </div>
  );
}
