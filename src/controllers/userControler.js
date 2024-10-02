const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const signup = async (req, res) => {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};

const protected = (req, res) => {
    res
    .json({ message: `Olá, ${req.user.username}! Você acessou uma rota protegida.` });
}

module.exports = { signup, login, protected};