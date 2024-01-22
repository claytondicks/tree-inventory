import { useEffect } from "react";
import { auth } from "../../config/firebase-config";
import firebase from "firebase/compat/app";
// imports pre-built UI for firebase authentication
import * as firebaseui from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";

export const Login = () => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      // since Firebase v9 and above service are imported when needed instad of being a namespace
      new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/inventory",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        // leave for ANOTHER video
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],

    });
  }, []);

    
    return (

            <div id="firebaseui-auth-container"></div>
    )

};