import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const [currentVan, setCurrentVan] = useOutletContext();
  return (
    <div>
      <img src={currentVan.imageUrl} />
    </div>
  );
}
