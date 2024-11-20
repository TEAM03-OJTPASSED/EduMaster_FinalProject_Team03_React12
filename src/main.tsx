import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import ErrorBoundary from "./utils/errorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="67368420889-utrdru1873d1pudjah97ihj32vvfire8.apps.googleusercontent.com">
    <StrictMode>
    <ErrorBoundary>


      <Provider store={store}>
        <App />
      </Provider>
      </ErrorBoundary>
    </StrictMode>
  </GoogleOAuthProvider>
);
