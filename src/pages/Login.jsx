import React from "react";

import { useState } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { loginUser } from "../api";

// This function accesses the message in the URL from the utils function
export function loginLoader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action() {
  console.log("Action function");
  return null;
}

export default function Login() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const message = useLoaderData();

  // console.log(message);

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      <Form method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
