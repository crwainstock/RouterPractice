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
    console.log(data.vans[0]);
  };

  useEffect(() => {
    fetchVanDetails();
  }, []);

  return (
    <div>
      <h1>Host vans details go here.</h1>
    </div>
  );
}
