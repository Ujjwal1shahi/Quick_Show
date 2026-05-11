import axios from "axios";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const getMovieFromOMDB = async (imdbID) => {
  try {
    if (!imdbID) {
      return null;
    }

    const { data } = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
        plot: "full",
      },
    });

    if (data.Response === "False") {
      return null;
    }

    return data;
  } catch (error) {
    console.log("OMDB API Error:", error.message);
    return null;
  }
};
