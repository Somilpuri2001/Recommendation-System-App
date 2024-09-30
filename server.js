const express = require('express');
const app = express();
const morgan = require("morgan")
const cors = require('cors');
const dotenv = require('dotenv')

const PORT = 8080;


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

const recommendationRouter = require("./routes/recommendationRoutes");

app.use("/api/v1/recommendations",recommendationRouter)

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})