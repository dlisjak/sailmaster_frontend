//export const BACKEND_URL = "https://thesailmaster.si/api/";
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:8000/api/";

export const BACKEND_URL2 = BACKEND_URL + "v2/"
