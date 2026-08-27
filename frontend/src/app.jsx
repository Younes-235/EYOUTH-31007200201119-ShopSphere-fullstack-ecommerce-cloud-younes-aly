import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar.jsx"; 
import Footer from "./Footer.jsx";

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from "./pages/ProductDetail.jsx";
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import ActivityLogs from './pages/ActivityLogs.jsx'; 
import Unauthorized from './pages/Unauthorized.jsx';
import Register from "./pages/Register.jsx";
import ProfileDashboard from "./pages/ProfileDashboard.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
      retry: 1
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>
                
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/profile" element={<ProfileDashboard/>}/>
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
                  <Route path="/admin" element={<AdminPanel/>}/>
                  <Route path="/admin/logs" element={<ActivityLogs/>}/> 
                </Route>
              </Routes>
            </main>

            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}