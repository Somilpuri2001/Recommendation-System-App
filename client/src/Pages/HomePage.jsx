import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../Styles/Homepage.module.css";
import { FaSearch } from "react-icons/fa";
import { useMovies } from '../Context/Movies';
import Card from '../Components/Card';

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [disable, setDisable] = useState(true);
  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useMovies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_MODEL_URL, {
        title: title,
      });

      const ids = response.data.data.map((movie) => movie.movie_id);
      setMovieIds(ids);
    } catch (error) {
      console.log("Error while fetching movies");
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_MOVIE_DETAILS, {
        movieIds: movieIds,
      });
      setMovies(response.data.data);
    } catch (error) {
      console.log("Error while fetching movie details");
    }
  };

  useEffect(() => {
    if (movieIds.length > 0) {
      fetchMovieData();
    }
  }, [movieIds]);

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.headingDiv}`}>
        <h1 className={`${styles.heading}`}>Movie Recommendation System</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.inputBoxDiv}`}>
          <input
            type="text"
            placeholder="Enter Movie Name"
            className={`${styles.inputBox}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setDisable(e.target.value.length === 0);
            }}
          />
          <button className={`${styles.searchButton}`} disabled={disable}>
            <FaSearch style={{ color: '#FFFAFA', background: 'none' }} />
          </button>
        </div>
      </form>
      <div className={`${styles.cardHolder}`}>


        {movies.length > 0 ? <>
          {movies.map((movie, index) => {
            return (
              <Card
                key={index}
                poster={movie.poster_path}
                movie_title={movie.title}
              />
            )
          })}

        </> : <></>}
      </div>
    </div>
  );
};

export default HomePage;
