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
          className="van-type clear-filter"
          onClick={() => {
            setSearchParam({ type: "" });
          }}
        >
          Clear Filter
        </button>
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

// <Link to="?type=simple" className="van-type simple">
//           Simple
//         </Link>
//         <Link to="?type=luxury" className="van-type luxury">
//           Luxury
//         </Link>
//         <Link to="?type=rugged" className="van-type rugged">
//           Rugged
//         </Link>
//         <Link to="." className="van-type clear-filters">
//           Clear
//         </Link>
