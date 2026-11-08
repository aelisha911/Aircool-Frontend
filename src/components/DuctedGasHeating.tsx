function DuctedGasHeating() {
  // window.location.replace("/Homepage.html");
  const DuctedGasHeating = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCALHOST 
    : import.meta.env.VITE_API_URL;
  window.location.href = `${DuctedGasHeating}/`;
  return null;
}

export default DuctedGasHeating ;