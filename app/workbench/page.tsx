import { redirect } from 'next/navigation';

export default function WorkbenchPage() {
  // Générer un nouvel identifiant unique pour chaque visite
  const uniqueId = Math.random().toString(36).substring(2, 12);
  redirect(`/workbench/${uniqueId}`);
}
