import { hydrateRoot } from 'react-dom/client';
import ChatPage from '../chat/[id]/page.tsx';
import WorkbenchPage from '../workbench/[id]/page.tsx';
import HomePage from './page.tsx';

function App() {
  return (
    <div>
      <HomePage />
      <ChatPage />
      <WorkbenchPage />
    </div>
  );
}

export function Client() {
  hydrateRoot(document, <App />);
}
