const url = (id) =>
  `https://corsproxy.io/?https://hydapi.nve.no/api/v1/Timeseries/${id}/values?format=json`;

const fetchNVE = async (id) => {
  const res = await fetch(url(id));
  const data = await res.json();
  const latest = data.data[0].values.at(-1);
  return latest;
};

const oppdaterData = async () => {
  try {
    const vannstand = await fetchNVE(11918);   // Kista – vannstand
    const vannforing = await fetchNVE(11917);  // Kista – vannføring
    const vanntemp = await fetchNVE(11919);    // Kista – vanntemp
    const lufttemp = await fetchNVE(11920);    // Kista – lufttemp

    document.querySelector(".dato").textContent = new Date(vannstand.Time).toLocaleString("no-NO");

    document.querySelector(".vannstand .inndata").textContent = `${vannstand.Value} m`;
    document.querySelector(".vannforing .inndata").textContent = `${vannforing.Value} m³/s`;
    document.querySelector(".vanntemp .inndata").textContent = `${vanntemp.Value} °C`;
    document.querySelector(".lufttemp .inndata").textContent = `${lufttemp.Value} °C`;
  } catch (err) {
    console.error("Feil under lasting av data fra NVE:", err);
  }
};

oppdaterData();

console.log("fetch.js aktivert – legg inn fetch-kode her for å hente data fra NVE");
