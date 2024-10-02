import db from "../config/db.js";


const movieSchema = new db.Schema({
    Entidade: Movie
    {
    name: String,
    release_date: Date,
    director: String,
    classification: { type: String, enum: ['Livre', 'Maior16', 'Maior18'] }
    }
});

const Movie = db.model("Movie", movieSchema);

export default Movie;