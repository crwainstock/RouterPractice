import React from "react";
import { useRouteError } from "react-router-dom";

//The content of the error message here is produced in the api.js file, fetch request. If the fetch isn't
//successful, the error will throw.

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </div>
  );
}
