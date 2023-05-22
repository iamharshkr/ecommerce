import Cookies from "js-cookie";

export function getCookie() {
  const token = Cookies.get("access_token");

  if (!token) {
    console.log("no token detected");
    return (window.location.href = "/login");
  }
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return headers;
}
