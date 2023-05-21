import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../api";

// This function accesses the message in the URL from the utils function
export function loginLoader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export default function Login() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const message = useLoaderData();
  // console.log(message);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    loginUser(loginFormData)
      .then((data) => console.log(data))
      // Something isn't quite right here. Even if no username or password is submitted, it's still returning 200
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
