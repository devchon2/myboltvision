import { useParams } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { IdeationWorkbench } from '../components/workbench/IdeationWorkbench';

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ id: params.id });
}

export default function WorkbenchRoute() {
  const { id } = useParams();
  
  return (
    <div className="workbench-container">
      <IdeationWorkbench initialIdea="" />
      
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
