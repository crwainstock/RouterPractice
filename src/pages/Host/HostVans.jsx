import React, { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import BarLoader from "react-spinners/BarLoader";

export async function loader({ request }) {
  await requireAuth(request);
  const hostVansPromise = getHostVans();
  return defer({ vans: hostVansPromise });
}

function renderHostVans(vans) {
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
    <div className="host-vans-list">
      <section>{hostVansEls}</section>
    </div>
  );
}

export default function HostVans() {
  const dataPromise = useLoaderData();

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<BarLoader color="#ff8c38" />}>
        <Await resolve={dataPromise.vans}>{renderHostVans}</Await>
      </Suspense>
    </section>
  );
}
