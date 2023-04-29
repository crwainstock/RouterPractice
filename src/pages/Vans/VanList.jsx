import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return "Van data goes here.";
}

export default function VanList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState(null);

  //Using useSearchParams to filter van list by type
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  //State can be used in the Link as a prop to pass data to the next page
  const vanElements = filteredVans.map((van) => (
    <Link
      to={van.id}
      state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
    >
      <div key={van.id} className="van-tile">
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </div>
    </Link>
  ));

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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
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
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="van-list">{vanElements}</div>
      )}
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
