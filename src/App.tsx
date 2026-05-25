import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";
import AdminPanelLayout from "./components/AdminPanelLayout";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDiscountsPage from "./pages/AdminDiscountsPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";

const queryClient = new QueryClient();
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanelLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="discounts" replace />} />
            <Route path="discounts" element={<AdminDiscountsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
          </Route>
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<main className="section-padding" />}>
                <BlogsPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
