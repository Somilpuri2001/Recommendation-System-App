import React from 'react'
import styles from "../Styles/CardStyles.module.css"
import { useMovies } from '../Context/Movies'



const Card = (props) => {

  return (
    <div className={`${styles.cardDiv}`}>
    <div className={`${styles.cardImageDiv}`}>
      <img src={`https://image.tmdb.org/t/p/w500${props.poster}`} className={`${styles.cardImage}`}/>
    </div>
    <div className={`${styles.movieTitleDiv}`}>
        <p className={`${styles.movieTitle}`}>{props.movie_title}</p>
    </div>
  </div>
  )
}

export default Card