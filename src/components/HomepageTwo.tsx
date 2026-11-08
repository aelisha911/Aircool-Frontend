
function HomepageTwo() {
  // window.location.replace("/Homepage.html");
  const apiUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCALHOST 
    : import.meta.env.VITE_API_URL;
  window.location.href = `${apiUrl}/`;
  return null;
}

export default HomepageTwo;
