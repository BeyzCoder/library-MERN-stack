import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for creating a new book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message : `Missing a title input for the book.`
            });
        };
        if (!req.body.author) {
            return res.status(400).send({
                message : `Missing a author input for the book.`
            });
        };
        if (!req.body.publishYear) {
            return res.status(400).send({
                message : `Missing a publish year input for the book.`
            });
        };
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

// Route for seeing all books from the database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

// Route for seeing specific book from the database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findById(id);

        if (!result) {
            return res.status(404).json({message: `Book id { ${id} } not found `});
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

// Route for modifying or updating the book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message : `Missing a title input for the book.`
            });
        };
        if (!req.body.author) {
            return res.status(400).send({
                message : `Missing a author input for the book.`
            });
        };
        if (!req.body.publishYear) {
            return res.status(400).send({
                message : `Missing a publish year input for the book.`
            });
        };
        
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: `Book id { ${id} } not found `});
        }

        return res.status(200).send({
            message: `Book updated successfully`,
            data: req.body,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

// Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({message: `Book id { ${id} } not found `});
        }
        
        return res.status(200).send({message : `Book id { ${id} } has been deleted`});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

export default router;