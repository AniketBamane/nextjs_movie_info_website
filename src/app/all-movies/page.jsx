"use client"
import React, { useState, useEffect, useRef } from "react";
import MovieCard from "@/components/card/MovieCard";
import Link from "next/link";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const lastMovieElementRef = useRef();

  const fetchMovies = async (pageToFetch) => {
    console.log(pageToFetch)
    setLoading(true);
    try {
      const response = await fetch(`/api/movies?page=${pageToFetch}`, {
        method: "GET",
        cache:"force-cache"
      });
      const data = await response.json();
      if (response.ok) {
        setMovies(prevMovies => [...prevMovies, ...data.movies]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => {
          const newPage = prevPage + 1;
          return newPage;
        });
      }
    });
    if (lastMovieElementRef.current) observer.current.observe(lastMovieElementRef.current);
  }, [loading]);

  return (
    <div className="mx-5 my-32 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {error && <h1>{error}</h1>}
      {movies.length === 0 && !loading && <h1>No movies found!</h1>}
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <Link href={`/all-movies/${movie._id}`} key={movie._id} ref={lastMovieElementRef}>
              <MovieCard movie={movie} />
            </Link>
          )
        } else {
          return (
            <Link href={`/all-movies/${movie._id}`} key={movie._id}>
              <MovieCard movie={movie} />
            </Link>
          )
        }
      })}
      {loading && (
        <div className="w-full flex justify-center mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-600 h-full animate-loading-bar"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllMovies;
