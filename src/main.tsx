import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
)