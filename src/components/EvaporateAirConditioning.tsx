function EvaporateAirConditioning() {
  // window.location.replace("/Homepage.html");
  const EvaporateAirConditioning = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCALHOST 
    : import.meta.env.VITE_API_URL;
  window.location.href = `${EvaporateAirConditioning}/`;
  return null;
}

export default EvaporateAirConditioning ;