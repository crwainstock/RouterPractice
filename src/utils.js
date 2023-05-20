// import { redirect } from "react-router-dom";

// export async function requireAuth() {
//   const isLoggedIn = false;

//   // Something isn't working with the redirect here...manually going to the /login page works, but
//   // an error comes up instead of redirecting when navigating to the host page while isLoggedIn is false
//   // Return instead of throw doesn't work -- just accesses the host page
//   if (!isLoggedIn) {
//     throw redirect("/login");
//   }
// }

import { useNavigate } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  // Continue with the authenticated logic
}
