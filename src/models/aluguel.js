import db from "../config/db.js";

const rentalSchema = new db.Schema({
    name: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie: {
        type: db.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    rent_date: {
        type: String,
        required: true,
    },
    rent_return: {
        type: String,
        required: true
    }
});

const rental = db.model("Rental", rentalSchema);

export default rental;
