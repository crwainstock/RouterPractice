import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVans = async () => {
    setLoading(true);
    let results = await fetch(`/api/host/vans`);
    let data = await results.json();
    setVans(data.vans);
    setLoading(false);
  };

  useEffect(() => {
    fetchVans();
  }, []);

  const hostVansEls = vans.map((van) => (
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {loading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          <section>{hostVansEls}</section>
        )}
      </div>
    </section>
  );
}
