import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Developers from "./pages/Developers";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import Accessibility from "./pages/Accessibility";
import MetroAgent from "./pages/MetroAgent";
import CabAgent from "./pages/CabAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/success-stories" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/docs" element={<Developers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/metro" element={<MetroAgent />} />
          <Route path="/cab" element={<CabAgent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
