import { useState,useContext,createContext } from "react"


const MoviesContext = createContext();
const MoviesProvider = ({children}) => {

    const [movies,setMovies] = useState([]);


  return (
    <MoviesContext.Provider value={[movies,setMovies]}>
        {children}
    </MoviesContext.Provider>
  )
};

const useMovies = () => useContext(MoviesContext);

export {useMovies,MoviesProvider};