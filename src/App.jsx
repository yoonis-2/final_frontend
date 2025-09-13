import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Product from "./pages/Product"
import UpdateProduct from "./components/One-time-use/updateProduct"
import AddProduct from "./pages/AddProduct"
import Carts from "./pages/Carts"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Slidebar from "./pages/Slidebar"
import ProtectedRouter from "./pages/ProtectedRouter"

// Layout leh Header (Home, Product)
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

// Layout leh Dashboard (Dashboard iyo Product-ka gudaha dashboard)
function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Dashboard /> {/* Sidebar-ka dashboard */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

function App() {
  return (
    
    <Routes>
      {/* Pages leh Header */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* Dashboard iyo Product gudaha Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            {/* Default dashboard page */}
          <Slidebar/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <Product />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
    

      <Route
        path="/updateproduct/:id"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <UpdateProduct />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
      <Route
        path="/registerproduct"
        element={
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        }
      />
      <Route
        path="/carts"
        element={
          <MainLayout>
            <Carts />
          </MainLayout>
        }
      />
       <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
       <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
       
    </Routes>
  )
}

export default App
