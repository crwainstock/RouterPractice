import React from "react";
import {
  useLoaderData,
  useNavigate,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/host";
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const message = useLoaderData();
  const navigate = useNavigate();
  const errorMessage = useActionData();
  const navigation = useNavigation(); // Returns object with data about navigation status of app

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
