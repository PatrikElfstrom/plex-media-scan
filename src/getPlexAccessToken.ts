export function getPlexAccessToken() {
  return localStorage.getItem("myPlexAccessToken") || "";
}
