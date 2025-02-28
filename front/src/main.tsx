import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter } from "react-router";
import { SWRConfig } from "swr";
import { fetcher } from "./api/index.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SWRConfig value={{ fetcher }}>
      <App />
    </SWRConfig>
  </BrowserRouter>
);
