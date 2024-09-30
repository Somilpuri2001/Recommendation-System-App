const axios = require("axios")

const getRecommendationsController = async (req, res) => {

    try {
        url = 'http://127.0.0.1:5000/recommend'
        const { title } = req.body;
        if (!title) {
            res.status(400).send({
                success: false,
                message: "Please Enter Movie Name"
            })
        }
        const resposne = await axios.post(url, { movie_title: title })
        res.status(200).send({
            success: true,
            data: resposne.data
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Something Went Wrong"
        })
        console.log(`Error while Fetching movies ${error}`)
    }

}

const fetchMovieData = async (req, res) => {
    try {
        const { movieIds } = req.body;
        console.log(movieIds)
        const movieDetails = await Promise.all(movieIds.map(async (movieId) => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}`;
                const response = await axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${process.env.API_KEY}`
                    },
                    timeout:30000
                })
                return response.data;

            } catch (error) {
                console.error(`Error fetching data for movie ID ${movieId}:`, error.message);
                return null;
            }
        }))

        const validMovies = movieDetails.filter(movie => movie !== null);

        console.log(validMovies)

        res.status(200).send({
            success: true,
            data: validMovies
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to fetch movie details",
            error: error.message
        });
    }
}

module.exports = {
    getRecommendationsController: getRecommendationsController,
    fetchMovieData: fetchMovieData
}