import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Login from './pages/Login';
import RegisterAuth from './pages/RegisterAuth';
import AdminGames from './pages/AdminGames';
import ProtectedRoute from './routes/ProtectedRoute';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import AdminTournaments from './pages/AdminTournaments';
import Matches from './pages/Matches';
import AdminPeople from './pages/AdminPeople';
import CoordinatorRequest from './pages/CoordinatorRequest';
import {
  Games,
  Teams,
  TeamProfile,
  Players,
  PlayerProfile,
  Leaderboard,
  Community,
  Dashboard,
  Organizer,
} from './pages/PlatformViews';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAuth />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:slug" element={<TournamentDetail />} />
      <Route path="/tournaments/:slug/matches" element={<Matches />} />
      <Route path="/games" element={<Games />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamProfile />} />
      <Route path="/players" element={<Players />} />
      <Route path="/players/:id" element={<PlayerProfile />} />
      <Route path="/community" element={<Community />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-coordinator"
        element={
          <ProtectedRoute>
            <CoordinatorRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/games"
        element={
          <ProtectedRoute roles={['admin', 'coordinator']}>
            <AdminGames />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tournaments"
        element={
          <ProtectedRoute roles={['admin', 'coordinator']}>
            <AdminTournaments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer"
        element={
          <ProtectedRoute roles={['admin', 'coordinator']}>
            <Organizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/people"
        element={
          <ProtectedRoute roles={['admin', 'coordinator']}>
            <AdminPeople />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
