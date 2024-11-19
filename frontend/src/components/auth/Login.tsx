import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"; // Redux (if applicable)
import { login, logout } from "@/store/slice/auth.slice"; // Redux actions (if applicable)
import { GOOGLE_CLIENT_ID } from "@/config/config";

const Login: React.FC = () => {
  const dispatch = useDispatch(); // Redux dispatch (if applicable)
  const [user, setUser] = useState<{
    name: string;
    email: string;
    picture: string;
  } | null>(null);

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
          const { name, email, picture, id } = data.payload;

          // Update local state with user info
          setUser({ name, email, picture });

          // If using Redux, dispatch the login action
          dispatch(
            login({
              id,
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

  const handleLogout = () => {
    // Clear local user state
    setUser(null);

    // If using Redux, dispatch the logout action
    dispatch(logout());

    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleError = () => {
    toast.error("Login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
    console.error("Google Login error");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ToastContainer />
      {user ? (
        // Show user info and logout button
        <div className=" flex gap-2 justify-center items-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <button
            onClick={handleLogout}
            className=" bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        // Show Google login button
        <div>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={handleError} />
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
