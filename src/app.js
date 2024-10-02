import e from "express";
import "dotenv/config";
import user_router from "./routes/user-route.js";
import aluguel_router from "./routes/aluguelRoute.js";
import movieRoute from "./routes/movieRoute.js";

const app = e();

app.use(e.json());

app.use("/user", user_router);
app.use("/movie", movieRoute );
app.use("/aluguel", aluguel_router);

app.listen(process.env.API_PORT, () => console.log("Servidor pet auth executando na porta " + process.env.API_PORT));