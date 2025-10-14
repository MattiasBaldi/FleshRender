import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://26cfc144bc373797ce0fdf01b0945ad0@o4510067874398208.ingest.de.sentry.io/4510188646629456",

  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    "fleshrender.pages.dev", // <-- no protocol, no trailing slash
    /^\/api/, // <-- for same-origin API routes
  ],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
