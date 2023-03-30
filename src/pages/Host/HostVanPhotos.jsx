import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  // const { currentVan } = useOutletContext(); // Another way to send just the object of data
  const [currentVan, setCurrentVan] = useOutletContext();
  return (
    <div>
      <img src={currentVan.imageUrl} className="host-van-detail-image" />
    </div>
  );
}
