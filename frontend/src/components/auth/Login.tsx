import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"; // Redux (if applicable)
import { login } from "@/store/slice/auth.slice";

const Login: React.FC = () => {
  const dispatch = useDispatch(); // Redux dispatch (if applicable)

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

          // If using Redux, dispatch the login action
          dispatch(
            login({
              name,
              email,
              picture,
            })
          );

          console.log("User info:", { name, email, picture });

          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          throw new Error("Invalid response payload.");
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
    } else {
      toast.error("No credentials received. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
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
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ToastContainer />
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={handleError} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
