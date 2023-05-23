import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";
import BarLoader from "react-spinners/BarLoader";

export function loader() {
  const vansPromise = getVans();
  return defer({ vans: vansPromise });
}

export default function VanList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  //Using useSearchParams to filter van list by type
  const typeFilter = searchParams.get("type");
  // console.log(typeFilter);

  //Getting van data from Loader function above
  // With defer in loader, this will return a promise
  const dataPromise = useLoaderData();

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  function renderVanElements(vans) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link
          to={van.id}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));
    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handleFilterChange("type", "simple")}
            className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange("type", "luxury")}
            className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange("type", "rugged")}
            className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
          >
            Rugged
          </button>

          {typeFilter ? (
            <button
              onClick={() => handleFilterChange("type", null)}
              className="van-type clear-filters"
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<BarLoader color="#ff8c38" />}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}

//Using URLSearchParams methods to get path for Links below -- .delete() & .set() are methods with URLSearchParams

// function genNewSearchParamString(key, value) {
//   const sp = new URLSearchParams(searchParams);
//   if (value === null) {
//     sp.delete(key);
//   } else {
//     sp.set(key, value);
//   }
//   return `?${sp.toString()}`;
// }

//These examples uses the helper function above to generate the string for the URL path
//Should allow for multiple query parameters to be used together instead of clearing out existing search parameters

// <Link to={genNewSearchParamString("type", "simple")} className="van-type simple">
//           Simple
//         </Link>
//         <Link to={genNewSearchParamString("type", "luxury")} className="van-type luxury">
//           Luxury
//         </Link>
//         <Link to={genNewSearchParamString("type", "rugged")} className="van-type rugged">
//           Rugged
//         </Link>
//         <Link to={genNewSearchParamString("type", null)} className="van-type clear-filters">
//           Clear
//         </Link>

// Setting search params in onClick function -- version prior to current version

// <div className="van-list-filter-buttons">
//   <button
//     className="van-type simple"
//     onClick={() => {
//       setSearchParam({ type: "simple" });
//     }}
//   >
//     Simple
//   </button>
//   <button
//     className="van-type luxury"
//     onClick={() => {
//       setSearchParam({ type: "luxury" });
//     }}
//   >
//     Luxury
//   </button>
//   <button
//     className="van-type rugged"
//     onClick={() => {
//       setSearchParam({ type: "rugged" });
//     }}
//   >
//     Rugged
//   </button>
//   <button
//     className="van-type clear-filters"
//     onClick={() => {
//       setSearchParam({});
//     }}
//   >
//     Clear Filter
//   </button>
// </div>;
