import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first.");
  }
  return null;
}

// The ?message=You must log in first allows us to send this message through the URL to render in the login page
// if someone tries to access the host pages without being logged in. With useNavigate, you can send state through
// the navigate bit, but not with redirect
