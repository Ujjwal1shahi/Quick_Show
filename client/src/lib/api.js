const normalizeBaseUrl = (baseUrl = "") => baseUrl.replace(/\/+$/, "");

const API_BASE_URLS = [
  import.meta.env.VITE_API_URL,
  import.meta.env.VITE_API_BASE_URL,
  import.meta.env.VITE_BACKEND_URL,
  "http://localhost:5000",
]
  .map(normalizeBaseUrl)
  .filter(Boolean)
  .filter((value, index, arr) => arr.indexOf(value) === index);

const request = async (endpoint, options = {}) => {
  let lastError = null;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("API request failed");
};

export const getMovies = (search = "") => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return request(`/api/movies${query}`);
};

export const getMovieDetails = (id) => request(`/api/movies/${id}`);

export const getReleases = () => request("/api/releases");

export const getShowDetails = (id) => request(`/api/shows/${id}`);

export const getTrailers = () => request("/api/trailers");

export const getDashboardData = () => request("/api/admin/dashboard");

export const getBookings = () => request("/api/bookings");

export const getAdminBookings = () => request("/api/admin/bookings");

export const createBooking = (bookingData) =>
  request("/api/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });

export const markBookingPaid = (bookingId) =>
  request(`/api/bookings/${bookingId}/pay`, {
    method: "PATCH",
  });

export const searchMovies = (query) =>
  request(`/api/admin/search-movies?query=${encodeURIComponent(query)}`);

export const addShow = (showData) =>
  request("/api/admin/add-show", {
    method: "POST",
    body: JSON.stringify(showData),
  });

export default request;