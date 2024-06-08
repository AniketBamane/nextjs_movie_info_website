import React from 'react';
import BackButton from "@/components/Button/BackButton";
import Image from 'next/image';

const getAMovie = async (id) => {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: "GET",
      cache: "no-cache"
    });

    if (response.ok) {
      const data = await response.json();
      return data.movie;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error.message);
  }
};

const MovieDetails = async ({ params }) => {
  if (!params.id) {
    return <div>Movie details not available</div>;
  }
  const movie = await getAMovie(params.id);

  if (!movie) {
    return <div className="text-center text-2xl font-bold">Loading...</div>;
  }

  const {
    title,
    poster,
    plot,
    genres,
    runtime,
    cast,
    released,
    imdb: { rating, votes },
  } = movie;

  return (
    <div className="w-[90%] lg:w-[80%] my-8 mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
      <BackButton />
      <div className="flex flex-col md:flex-row items-center mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src={poster}
            alt={title}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-lg shadow-md"
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{released.slice(0, 10)}</p>
          <div className="flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.047 7.548l-3.047 3.047 1.548 1.548 8.998-8.998-1.548-1.548zM18.047 4.548C15.105 2.067 11.797 1.548 8.548 1.548S1.905 2.067 0 4.548c1.905 2.481 3.547 5.548 5.047 9.048l3.047-3.048z"
              />
            </svg>
            <span className="ml-1 text-gray-800">{rating}</span>
            <span className="text-gray-600 ml-2">({votes} votes)</span>
          </div>
          <div className="flex flex-wrap mt-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 mr-2 mb-2 rounded-full bg-blue-200 text-blue-700 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Plot</h2>
        <p className="text-gray-600">{plot}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Cast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cast.map((actor) => (
            <div key={actor} className="border border-gray-200 rounded-lg p-2">
              {actor}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Additional Info</h2>
        <p className="text-gray-600">Runtime: {runtime} minutes</p>
      </div>
    </div>
  );
};

export default MovieDetails;
