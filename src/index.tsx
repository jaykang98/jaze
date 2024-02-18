// index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));

<<<<<<< Updated upstream
root.render(
  <React.StrictMode>
    <App />{" "}
  </React.StrictMode>,
);
=======
root.render(<App />);
>>>>>>> Stashed changes
