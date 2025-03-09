import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/Footer";
import Jobs from "./components/jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescripation from "./components/JobDescripation";
import Companies from "./components/admin/Companies"; 
import CompaniesCreate from "./components/admin/CompanyCreate"; 
import CompanySetup from './components/admin/CompanySetup'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

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
      { path: "/profile", element: <Profile /> },
      { path: "/description/:jobId", element: <JobDescripation /> },

      { path: "/admin/companies", element: <Companies /> }, 
      { path: "/admin/companies/create", element: <CompaniesCreate /> }, 
      { path:"/admin/companies/:id", element: <CompanySetup /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;