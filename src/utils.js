import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("loggedin");
  //This needs to be true to log in with fake data, but it's throwing an error when it's true...not sure what's up.
  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first.");
  }
  // } else {
  //   throw redirect("/login");
  // }
}

// The ?message=You must log in first allows us to send this message through the URL to render in the login page
// if someone tries to access the host pages without being logged in. With useNavigate, you can send state through
// the navigate bit, but not with redirect

// This redirect isn't quite working how it should, but the error is not happening now that I added the second redirect
// to the login page.
