import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = useState(null);

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
    <div>
      <img src={currentVan.imageUrl} />
      <h2>{currentVan.name}</h2>
      <p>{currentVan.price}</p>
      <p>{currentVan.type}</p>
    </div>
  );
}
