import express from 'express';
import "./db"
import route from "./routes"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/routes', route)
const port = 8000;
app.listen(port, () => {
    console.log("Server is running at http://localhost:8000");
});





