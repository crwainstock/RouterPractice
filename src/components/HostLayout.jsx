import React from "react";
import Dashboard from "../pages/Host/Dashboard";
import { Outlet, Link } from "react-router-dom";

export default function HostLayout() {
  return (
    <div>
      <nav className="host-nav">
        <Link to="/host">Dashboard</Link>
        <Link to="/host/income">Income</Link>
        <Link to="/host/reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
}
