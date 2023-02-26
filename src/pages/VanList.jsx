import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VanList() {
  const [vans, setVans] = useState([]);

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

  const vanElements = vans.map((van) => (
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
  ));

  return <div>{vanElements}</div>;
}
