import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Global } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}>
    <ChakraProvider>
      {/* <Auth0Provider
        domain={process.env.REACT_APP_OAUTH_DOMAIN}
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      > */}
      <Global
        styles={{
          ".clearfix::after": {
            content: `""`,
            display: "table",
            clear: "both",
          },
        }}
      />
      <App />
      {/* </Auth0Provider> */}
    </ChakraProvider>
  </GoogleOAuthProvider>
);
