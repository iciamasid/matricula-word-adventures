
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { adService } from './services/AdService';

// Inicializar AdService cuando la app se carga
adService.initialize().then(() => {
  console.log('AdService initialized on app startup');
}).catch((error) => {
  console.error('Failed to initialize AdService on startup:', error);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
