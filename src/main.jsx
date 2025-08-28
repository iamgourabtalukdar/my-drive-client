import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DriveProvider } from "./contexts/DriveContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DriveProvider>
          <App />
        </DriveProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
