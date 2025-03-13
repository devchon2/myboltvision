import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      status: 'ok',
    },
  };
};

export default function Index() {
  // Votre composant de page ici
  return (
    <div>
      <h1>Page d'accueil</h1>
    </div>
  );
}
