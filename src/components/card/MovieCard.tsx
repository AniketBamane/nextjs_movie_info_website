import Image from 'next/image';
import React from 'react';

const MovieCard = ({ movie }:{movie:any}) => {
  const { poster, title, languages, imdb, genres } = movie;

  const renderLanguages = () => {
    return languages.map((language:string) => (
      <span key={language} className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 mr-1">
        {language}
      </span>
    ));
  };

  const renderGenres = () => {
    return genres.map((genre:string) => (
      <span key={genre} className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 mr-1">
        {genre}
      </span>
    ));
  };

  const starRating = Math.floor(imdb.rating / 2);

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-xl">
      <Image
        className="w-full h-48 object-cover"
        src={poster == null  ? "https://st3.depositphotos.com/2021995/13211/i/450/depositphotos_132110706-stock-photo-movie-tiled-letters-concept-and.jpg":poster}
        width={600}
        height={400}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center mt-2">
          {languages && renderLanguages()}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-2">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <i key={index} className={index < starRating ? 'fas fa-star' : 'far fa-star'}></i>
              ))}
          </span>
          <span className="text-gray-500">{imdb.rating}</span>
        </div>
        <div className="flex items-center mt-2">
          {genres && renderGenres()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
