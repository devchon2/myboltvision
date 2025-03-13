import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { IdeationWorkbench } from '../components/workbench/IdeationWorkbench.jsx';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return { props: { id } };
};

export default function WorkbenchRoute({ id }: { id: string }) {
  const router = useRouter();
  const { id: queryId } = router.query as { id: string };

  return (
    <div className="workbench-container">
      <IdeationWorkbench initialIdea={queryId} />

      <style jsx>{`
        .workbench-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
