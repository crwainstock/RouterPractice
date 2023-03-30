import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  // const { currentVan } = useOutletContext(); // Another way to send just the object of data
  const [currentVan, setCurrentVan] = useOutletContext();
  return (
    <div>
      <h4>{currentVan.price}/day</h4>
    </div>
  );
}
