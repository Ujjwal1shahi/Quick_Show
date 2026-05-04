import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calendar, Clock, Play, Star, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import "./HeroSection.css";

const getImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `https://image.tmdb.org/t/p/original${path}`;
};

const formatRuntime = (runtime) => {
  if (!runtime) return "2h 00m";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const splitTitle = (title = "Cinema Movie") => {
  const words = title.trim().split(/\s+/);

  return {
    first: words.slice(0, 2).join(" ") || "Cinema",
    second: words.slice(2, 4).join(" ") || "Featured",
    accent: words.slice(4, 7).join(" ") || "Movie",
  };
};

const HeroSection = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerClicked, setIsTrailerClicked] = useState(false);

  const movies = dummyShowsData || [];
  const currentMovie = movies[currentIndex] || movies[0] || {};

  const movieData = useMemo(() => {
    const title = currentMovie.title || currentMovie.name || "Movie Title";
    const genres =
      currentMovie.genres?.map((genre) => genre.name || genre).slice(0, 3) ||
      ["Action", "Adventure"];

    return {
      id: currentMovie._id || currentMovie.id,
      title,
      titleParts: splitTitle(title),
      year: currentMovie.release_date?.split("-")[0] || "2025",
      runtime: formatRuntime(currentMovie.runtime),
      genres,
      rating: Number(currentMovie.vote_average || 7.5).toFixed(1),
      overview:
        currentMovie.overview ||
        "Book tickets for the latest cinematic experience with premium seats, trailers, and smooth show selection.",
      backdrop: getImageUrl(currentMovie.backdrop_path || currentMovie.poster_path),
      poster: getImageUrl(currentMovie.poster_path || currentMovie.backdrop_path),
    };
  }, [currentMovie]);

  useEffect(() => {
    if (movies.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movies.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];

    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        speed: Math.random() * 0.18 + 0.04,
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    drawStars();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--move-x", `${x * 18}px`);
      hero.style.setProperty("--move-y", `${y * 12}px`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const goToMovie = () => {
    if (!movieData.id) return;
    navigate(`/movies/${movieData.id}`);
    window.scrollTo(0, 0);
  };

  const handleExplore = () => {
    navigate("/movies");
    window.scrollTo(0, 0);
  };

  const handleTrailer = () => {
    setIsTrailerClicked(true);
    document.getElementById("trailers")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setIsTrailerClicked(false), 1200);
  };

  const tickerItems = [
    movieData.title,
    "Book Your Tickets",
    "Premium Seats",
    ...movieData.genres,
    `Rating ${movieData.rating}`,
    "Now Showing",
    movieData.title,
    "Book Your Tickets",
    "Premium Seats",
    ...movieData.genres,
    `Rating ${movieData.rating}`,
    "Now Showing",
  ];

  return (
    <section ref={heroRef} className="cinema-hero">
      <canvas ref={canvasRef} className="cinema-starfield" />

      <div className="cinema-nebula" />
      <div className="cinema-scanlines" />
      <div className="cinema-vertical-line" />

      <div
        className="cinema-backdrop"
        style={{ backgroundImage: `url(${movieData.backdrop})` }}
      />

      <div className="cinema-side-dots">
        {movies.slice(0, 5).map((movie, index) => (
          <button
            key={movie._id || movie.id || index}
            onClick={() => setCurrentIndex(index)}
            className={currentIndex === index ? "active" : ""}
            aria-label={`Show ${movie.title}`}
          />
        ))}
      </div>

      <div className="cinema-content">
        {/* <div className="cinema-badge">
          <span>Cinema</span>
          <p>Featured Release</p>
        </div> */}

        <h1 className="cinema-title">
          <span>{movieData.titleParts.first}</span>
          <span>{movieData.titleParts.second}</span>
          <em>{movieData.titleParts.accent}</em>
        </h1>

        <div className="cinema-meta">
          <span>
            <Calendar size={15} />
            {movieData.year}
          </span>
          <span>
            <Clock size={15} />
            {movieData.runtime}
          </span>
          <span>{movieData.genres.join(" • ")}</span>
        </div>

        <div className="cinema-rating">
          <strong>{movieData.rating}</strong>
          <div>
            <div className="cinema-stars">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star
                  key={item}
                  size={15}
                  fill="currentColor"
                  className={item <= Math.round(movieData.rating / 2) ? "active" : ""}
                />
              ))}
            </div>
            <p>IMDb Rating</p>
          </div>
        </div>

        <p className="cinema-description">{movieData.overview}</p>

        <div className="cinema-actions">
          <button onClick={goToMovie} className="cinema-primary-btn">
            <Ticket size={17} />
            Book Tickets
          </button>

          <button onClick={handleTrailer} className="cinema-secondary-btn">
            <span>
              <Play size={14} fill="currentColor" />
            </span>
            {isTrailerClicked ? "Opening trailers" : "Watch Trailer"}
          </button>

          <button onClick={handleExplore} className="cinema-link-btn">
            Explore Movies
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <button className="cinema-poster-card" onClick={goToMovie}>
        <img src={movieData.poster} alt={movieData.title} />
        <div>
          <p>Now Showing</p>
          <h3>{movieData.title}</h3>
          <span>Tap to view details</span>
        </div>
      </button>

      <div className="cinema-progress">
        <span>Featured</span>
        <div>
          <i style={{ width: `${movies.length ? ((currentIndex + 1) / movies.length) * 100 : 0}%` }} />
        </div>
        <span>
          {String(currentIndex + 1).padStart(2, "0")} / {String(movies.length).padStart(2, "0")}
        </span>
      </div>

      <div className="cinema-ticker">
        <div>
          {tickerItems.map((item, index) => (
            <span key={`${item}-${index}`} className={index % 6 === 0 ? "accent" : ""}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
