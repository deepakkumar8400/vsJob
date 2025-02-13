import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/Footer";
import Jobs from'./components/jobs';
import Browse from "./components/Browse";

// ✅ Layout Component: Jo har page ke sath dikhega
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />  
      <Footer />
    </div>
  );
};

// ✅ Browser Router Config
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/browse", element: <Browse /> },
    ],
  },
]);


function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
