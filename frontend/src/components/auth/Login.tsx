import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const handleGoogleLogin = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        // Decode the Google token to extract user info
        const decoded: any = jwtDecode(credentialResponse.credential);
        console.log("Credential Response:", credentialResponse);
        console.log("Decoded Token:", decoded);

        // Send the token to your backend for further validation using Axios
        const res = await axios.post(
          "http://localhost:3000/api/v1/auth/google",
          {
            token: credentialResponse.credential,
          }
        );

        const data = res.data;

        if (data.payload) {
          const { name, email, picture } = data.payload;
          console.log("User info:", { name, email, picture });

          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (err: any) {
        console.error("API error:", err);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    }
  };

  const handleError = () => {
    toast.error("Login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
    console.error("Google Login error");
  };

  return (
    <GoogleOAuthProvider clientId="751176710085-3n86dp3anofhmpufip4t8bal3l6iee1g.apps.googleusercontent.com">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md text-center">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
