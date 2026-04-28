
import Navbar from "../components/Navbar";

import {Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Layout = ({ children }) => {

  const {user , isLoading} = useAuth();

  if(isLoading) return <div>Loading...</div>;

  if(!user) return <Navigate to="/login" />;

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
