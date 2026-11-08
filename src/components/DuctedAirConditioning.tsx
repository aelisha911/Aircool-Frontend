function DuctedAirConditioning() {
  // window.location.replace("/Homepage.html");
  const DuctedAirConditioning = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCALHOST 
    : import.meta.env.VITE_API_URL;
  window.location.href = `${DuctedAirConditioning}/`;
  return null;
}

export default DuctedAirConditioning ;