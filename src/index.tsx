import React from "react";
import ReactDOM from "react-dom/client";
import ServerList from "./components/ServerList";
import ServerStatusIndicator from "./components/SeverStatusIndicator";
import connect from "./utils/connectWS";

import "./css/index.css";
import IndexPage from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardOverviewPage from "./pages/dashboard/overview";
import DashboardConsolePage from "./pages/dashboard/console";
import DashboardFilesPage from "./pages/dashboard/files";
import SettingsPage from "./pages/settings";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/dashboard/overview/:tag" element={<DashboardOverviewPage/>} />
      <Route path="/dashboard/console/:tag" element={<DashboardConsolePage/>} />
      <Route path="/dashboard/files/:tag" element={<DashboardFilesPage/>} />
      <Route path="/settings" element={<SettingsPage/>} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

connect()