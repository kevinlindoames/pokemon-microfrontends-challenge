import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../../widgets/app-layout/AppLayout';
import { HistoryPage } from '../../pages/history/HistoryPage';
import { HomePage } from '../../pages/home/HomePage';
import { LoginPage } from '../../pages/login/LoginPage';
import { PokemonDetailPage } from '../../pages/pokemon-detail/PokemonDetailPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetailPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}