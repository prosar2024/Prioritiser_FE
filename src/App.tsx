import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/public/WelcomePage";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import React from "react";
import { AppContextProvider } from "./lib/AppContext";
import MainLayout from "./pages/authorised/MainLayout";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<AuthenticatedPageRouter />} />
        </Routes>
      </Router>
  );


  function AuthenticatedPageRouter() {
      return (
        <React.Fragment>
          <AppContextProvider>
            <MainLayout />
          </AppContextProvider>
        </React.Fragment>
      )
    }
    
}