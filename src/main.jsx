import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen flex justify-center bg-white">
      <div className="w-full max-w-[430px] min-h-screen">
        <App />
      </div>
    </div>
  </StrictMode>,
);
