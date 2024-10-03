import Rental from "../models/aluguel";
import Movie from "../models/movie";

// Função para criar um novo aluguel
export const createRental = async (req, res) => {
  const { movieId, returnDate } = req.body;
  const userId = req.user._id; 

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    const newRental = new Rental({
      user: userId,
      movie: movieId,
      return_date: returnDate
    });

    const savedRental = await newRental.save();
    res.status(201).json({ message: 'Aluguel criado com sucesso!', rental: savedRental });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aluguel', error: error.message });
  }
}

// Função para listar todos os aluguéis
export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate('user').populate('movie');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar aluguéis', error: error.message });
  }
}

// Função para obter um aluguel específico
export const getRentalById = async (req, res) => {
  const rentalId = req.params.id;

  try {
    const rental = await Rental.findById(rentalId).populate('user').populate('movie');
    if (!rental) {
      return res.status(404).json({ message: 'Aluguel não encontrado' });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar aluguel', error: error.message });
  }
}

// Função para atualizar um aluguel
export const updateRental = async (req, res) => {
  const rentalId = req.params.id;
  const { returnDate } = req.body;

  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      rentalId,
      { return_date: returnDate },
      { new: true }
    );

    if (!updatedRental) {
      return res.status(404).json({ message: 'Aluguel não encontrado' });
    }

    res.json({ message: 'Aluguel atualizado com sucesso!', rental: updatedRental });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar aluguel', error: error.message });
  }
}

// Função para deletar um aluguel
 export const deleteRental = async (req, res) => {
  const rentalId = req.params.id;
  try {
    const deletedRental = await Rental.findByIdAndDelete(rentalId);
    if (!deletedRental) {
      return res.status(404).json({ message: 'Aluguel não encontrado' });
    }
    res.json({ message: 'Aluguel deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar aluguel', error: error.message });
  }
}
