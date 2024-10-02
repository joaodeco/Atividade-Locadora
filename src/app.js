const express = require ('express');
const app = express();
const porta = 3000;
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

dotenv.config();
connectDB();

app.use('/api', userRoutes);

app.listen(porta, ()=>{
    console.log(`O servidor está rodando em http://localhost:${porta}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado')
})