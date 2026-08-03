import React from "react";
import Home from "./components/Home";
import { Route,Routes } from "react-router-dom";
import Form from "./components/Form";
import Login from "./pages/Login";
import RegisterAuth from "./pages/RegisterAuth";
import AdminGames from "./pages/AdminGames";
import ProtectedRoute from "./routes/ProtectedRoute";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import AdminTournaments from "./pages/AdminTournaments";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/form" element={<Form/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterAuth/>} />
      <Route path="/tournaments" element={<Tournaments/>} />
      <Route path="/tournaments/:slug" element={<TournamentDetail/>} />
      <Route
        path="/admin/games"
        element={
          <ProtectedRoute roles={["admin", "coordinator"]}>
            <AdminGames />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/tournaments" element={<ProtectedRoute roles={["admin", "coordinator"]}><AdminTournaments /></ProtectedRoute>} />
    </Routes>
    
  );
}
export default App;
