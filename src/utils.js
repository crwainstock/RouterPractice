import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;

  // Something isn't working with the redirect here...manually going to the /login page works, but
  // an error comes up instead of redirecting when navigating to the host page while isLoggedIn is false
  if (!isLoggedIn) {
    throw redirect("/login");
  }
}
