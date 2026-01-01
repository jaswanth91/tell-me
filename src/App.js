// src\App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AccessDenied from "./pages/AccessDenied";
import WelcomePage from "./pages/WelcomePage";
import RevealPage from "./pages/RevealPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/denied" element={<AccessDenied />} />
        <Route path="/reveal" element={<RevealPage />} />
       <Route path="/admin-secret-123" element={<AdminPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
