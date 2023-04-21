import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function VanList() {
  const [searchParams, setSearchParam] = useSearchParams();
  const [vans, setVans] = useState([]);

  //Using useSearchParams to filter van list by type
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  // const getVans = async () => {
  //   let results = await fetch(`/api/vans`);
  //   let data = results.json();
  //   setVans(data);
  // };

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = filteredVans.map((van) => (
    <Link to={`/vans/${van.id}`}>
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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className="van-type simple"
          onClick={() => {
            setSearchParam({ type: "simple" });
          }}
        >
          Simple
        </button>
        <button
          className="van-type luxury"
          onClick={() => {
            setSearchParam({ type: "luxury" });
          }}
        >
          Luxury
        </button>
        <button
          className="van-type rugged"
          onClick={() => {
            setSearchParam({ type: "rugged" });
          }}
        >
          Rugged
        </button>
        <button
          className="van-type clear-filters"
          onClick={() => {
            setSearchParam({});
          }}
        >
          Clear Filter
        </button>
      </div>
      <div className="van-list">{vanElements}</div>
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
