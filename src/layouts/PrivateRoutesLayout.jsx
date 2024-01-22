import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const PrivateRoutesLayout = () => {
    const auth  = useAuth();
    let location = useLocation()
    
    if (auth.loading) return "authenticating";

    //console.log('/////user autheticated', auth);     
  
    if (!auth.user) {  
        return <Navigate to="/" state={{ from: location }} replace />   
    }  
    // keep the previous navigation stack
    return <Outlet />

  };