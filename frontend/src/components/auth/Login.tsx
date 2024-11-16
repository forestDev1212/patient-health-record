import React from "react";

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Point to your backend's Google login endpoint
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6 mr-2"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.7 0 7 .9 9.9 2.5l7.3-7.3C36.6 1.6 30.6 0 24 0 14.6 0 6.6 5.8 2.8 14.2l8.6 6.7C13.2 13.3 18.1 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.2 24.3c0-1.6-.1-3.1-.4-4.6H24v9h12.5c-.6 3.2-2.5 6-5.1 7.8l8.6 6.7c5-4.6 8.2-11.5 8.2-19z"
            />
            <path
              fill="#FBBC05"
              d="M10.8 28.1c-.6-1.6-1-3.3-1-5.1s.4-3.5 1-5.1l-8.6-6.7c-1.8 3.4-2.9 7.2-2.9 11.8s1 8.4 2.9 11.8l8.6-6.7z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 12-2.1 16-5.7l-8.6-6.7c-2.3 1.6-5.2 2.5-8.5 2.5-5.9 0-10.8-3.8-12.6-9.1l-8.6 6.7C6.6 42.3 14.6 48 24 48z"
            />
          </svg>
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
