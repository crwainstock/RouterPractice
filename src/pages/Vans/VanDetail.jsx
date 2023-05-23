import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";
import BarLoader from "react-spinners/BarLoader";

export function loader({ params }) {
  const vanPromise = getVans(params.id);
  return defer({ van: vanPromise });
}

export default function VanDetail() {
  // State stored in the browser
  const location = useLocation();

  //This is where the data is coming from -- replaces the fetch we had in the useEffect originally
  const dataPromise = useLoaderData();

  //This uses the location data saved in the Link state from VanList -- if there's a search filter,
  // it's used in the back button URL, if not, no filter is used
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  function renderVanDetails(van) {
    return (
      <div className="van-detail-container">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr; <span>Back to {type} vans</span>
        </Link>

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
      </div>
    );
  }

  return (
    <Suspense fallback={<BarLoader color="#ff8c38" />}>
      <Await resolve={dataPromise.van}>{renderVanDetails}</Await>
    </Suspense>
  );
}
