import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import icons we specified in the library to minimize bundle size
import "./fontawesome";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
