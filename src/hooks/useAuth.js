
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config"

export const useAuth = () => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true); // <-- initial true for initial mount render
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          //console.log(user);
          if (user) {
            setUser(user);            
            try {
                const authInfo = {
                    userID: user.uid,
                    email: user.email,
                    name: user.displayName,
                };

                localStorage.setItem("auth", JSON.stringify(authInfo))
            } catch (error) {
                    console.log('Error')
                }
          } else {
            setUser(false);
          }
          setLoading(false); // <-- clear
        }); 
        return () => {
          unsubscribe();
        };
      }, []);

    return { user, loading };
  }