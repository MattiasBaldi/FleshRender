import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";
import { ErrorBoundary } from "@sentry/react";
import { NuqsAdapter } from "nuqs/adapters/react";

Sentry.init({
  dsn: "https://26cfc144bc373797ce0fdf01b0945ad0@o4510067874398208.ingest.de.sentry.io/4510188646629456",

  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  environment: "production",

  _experiments: {
    enableLogs: true,
  },

  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    "fleshrender.pages.dev", // <-- no protocol, no trailing slash
    /^\/api/, // <-- for same-origin API routes
  ],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,

  // <-- Add this to block localhost errors
  beforeSend(event) {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return null; // drop event
    }
    return event;
  },
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <StrictMode>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </StrictMode>
  </ErrorBoundary>
);
