const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
};

export const getMovies = (search = "") => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return request(`/api/movies${query}`);
};

export const getMovieDetails = (id) => request(`/api/movies/${id}`);

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

export default request;
