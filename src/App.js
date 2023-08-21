import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Error from "./pages/Error/Error";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import InfoPersonal from "./pages/InfoPersonal/InfoPersonal";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const Layout = () => {
    return (
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/dang-nhap" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gioi-thieu",
          element: <About />,
        },
        {
          path: "/san-phams",
          element: <Products />,
        },
        {
          path: "/lien-he",
          element: <Contact />,
        },
        {
          path: "/san-pham/:id",
          element: <Product />,
        },
        {
          path: "/gio-hang",
          element: <Cart />,
        },
        {
          path: "/thanh-toan",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dang-nhap",
          element: <Login />,
        },
        {
          path: "/dang-ky",
          element: <Register />,
        },

        {
          path: "/thong-tin-ca-nhan",
          element: (
            <ProtectedRoute>
              <InfoPersonal />
            </ProtectedRoute>
          ),
        },
        {
          path: "/chi-tiet-don-hang/:id",
          element: (
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
