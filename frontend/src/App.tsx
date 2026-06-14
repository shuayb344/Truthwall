import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import WritePage from "@/pages/WritePage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AdminPage from "@/pages/AdminPage";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/PostPage";
import NotificationsPage from "./pages/NotificationsPage";
import MainLayout from "@/components/layout/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Main App Layout */}
          <Route element={<MainLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/post/:id" element={<PostPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center"
        toastOptions={{
          style: {
            background: "#1C1C28",
            color: "#EEEEF5",
            border: "1px solid #2A2A3E",
          },
        }} />

    </QueryClientProvider>
  );
};

export default App;   