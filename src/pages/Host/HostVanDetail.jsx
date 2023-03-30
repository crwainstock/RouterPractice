import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = useState({});

  const { id } = useParams();

  // Write this function here to avoid the "destroy is not a function" error
  // https://stackoverflow.com/questions/74265321/uncaught-typeerror-destroy-is-not-a-function-error-in-react
  const fetchVanDetails = async () => {
    let results = await fetch(`/api/host/vans/${id}`);
    let data = await results.json();
    setCurrentVan(data.vans[0]);
  };

  useEffect(() => {
    fetchVanDetails();
  }, []);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section id="host-van-details">
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={[currentVan, setCurrentVan]} />
        {/* context={{currentVan}} -- This way sends just the object of data*/}
      </div>
    </section>
  );
}
