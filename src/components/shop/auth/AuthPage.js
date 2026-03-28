import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginReq, signupReq } from "./fetchApi";

const AuthPage = () => {
  const history = useHistory();
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "", error: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", cPassword: "", error: "", success: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return setLoginData({ ...loginData, error: "All fields are required" });
    }
    const res = await loginReq({ email: loginData.email, password: loginData.password });
    if (res.error) {
      setLoginData({ ...loginData, error: res.error, password: "" });
    } else if (res.token) {
      localStorage.setItem("jwt", JSON.stringify(res));
      history.push("/");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.cPassword) {
      return setSignupData({ ...signupData, error: "All fields are required", success: "" });
    }
    if (signupData.password !== signupData.cPassword) {
      return setSignupData({ ...signupData, error: "Passwords do not match", success: "" });
    }
    const res = await signupReq({ name: signupData.name, email: signupData.email, password: signupData.password, cPassword: signupData.cPassword });
    if (res.error) {
      setSignupData({ ...signupData, error: typeof res.error === "object" ? Object.values(res.error).find(v => v) : res.error, success: "" });
    } else if (res.success) {
      setSignupData({ name: "", email: "", password: "", cPassword: "", error: "", success: res.success });
      setTimeout(() => setTab("login"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gray-800 px-8 py-6 text-center">
          <h1 className="text-white text-3xl font-bold tracking-widest uppercase">BF-Fabric</h1>
          <p className="text-gray-400 text-sm mt-1">Premium Fabric & Clothing Store</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setTab("login")}
            className={`w-1/2 py-3 text-sm font-semibold tracking-wide transition-colors ${
              tab === "login" ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`w-1/2 py-3 text-sm font-semibold tracking-wide transition-colors ${
              tab === "signup" ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="px-8 py-6">

          {/* LOGIN FORM */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome back</h2>

              {loginData.error && (
                <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-2 rounded">
                  {loginData.error}
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value, error: "" })}
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value, error: "" })}
                  placeholder="••••••••"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded font-semibold text-sm hover:bg-gray-700 transition-colors"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span onClick={() => setTab("signup")} className="text-gray-800 font-semibold cursor-pointer hover:underline">
                  Create one
                </span>
              </p>
            </form>
          )}

          {/* SIGNUP FORM */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Create your account</h2>

              {signupData.error && (
                <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-2 rounded">
                  {signupData.error}
                </div>
              )}
              {signupData.success && (
                <div className="bg-green-50 border border-green-300 text-green-600 text-sm px-4 py-2 rounded">
                  {signupData.success} Redirecting to login...
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value, error: "", success: "" })}
                  placeholder="John Doe"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value, error: "", success: "" })}
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value, error: "", success: "" })}
                  placeholder="Min. 8 characters"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  value={signupData.cPassword}
                  onChange={(e) => setSignupData({ ...signupData, cPassword: e.target.value, error: "", success: "" })}
                  placeholder="••••••••"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded font-semibold text-sm hover:bg-gray-700 transition-colors"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span onClick={() => setTab("login")} className="text-gray-800 font-semibold cursor-pointer hover:underline">
                  Sign in
                </span>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthPage;
