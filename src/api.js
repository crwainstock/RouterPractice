export async function getVans() {
  try {
    const res = await fetch("/api/vans");
    const data = await res.json();
    return data.vans;
  } catch (err) {
    console.log(err);
  }
}

// OLD FETCH FROM USEEFFECT
// fetch("/api/vans")
//   .then((res) => res.json())
//   .then((data) => setVans(data.vans));
