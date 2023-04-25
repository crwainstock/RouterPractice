import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function VanDetail() {
  const [van, setVan] = useState([]);
  const params = useParams();
  //   console.log(params);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  //This uses the location data saved in the Link state from VanList -- if there's a search filter, it's used in the back button URL, if not, no filter is used
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
