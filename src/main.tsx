
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Google Lora font to the head
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap';
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
