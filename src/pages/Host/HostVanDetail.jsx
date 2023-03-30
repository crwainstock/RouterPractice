import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

  return (
    <section>
      <Link to="?" className="back-button">
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
      </div>
    </section>
  );
}
