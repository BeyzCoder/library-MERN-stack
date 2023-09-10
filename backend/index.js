import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(234).send(`Welcome to MERN Stack`);
});

app.use('/books', booksRoute);

// Make a connection to the database.
mongoose.connect(mongoDBURL)
    .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
    })
    .catch((error) => {
        console.log(error);
    });