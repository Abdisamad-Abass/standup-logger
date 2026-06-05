import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import FeedPage from "./pages/FeedPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default feed */}
        <Route index element={<FeedPage />} />

        {/* Admin routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="create-user"
          element={
            <ProtectedRoute role="admin">
              <CreateUserPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
