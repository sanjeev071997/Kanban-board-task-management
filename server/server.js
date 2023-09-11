import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import todoRoutes from './routes/todoRoutes.js'
import boardRoutes from './routes/addBoard.js'
import taskRoutes from './routes/newTask.js'
const PORT = 8080
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});

dotenv.config()
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors({useCredentials: true}))

// mongodb connection
connectDB()
app.use('/api/v1/todo', todoRoutes)
app.use('/api/v1/addBoard', boardRoutes)
app.use('/api/v1/task', taskRoutes)

app.get('/', (req, res) => {
    res.send('Welcome To Kanban Board Task Management')
})

// static files
app.use(express.static(path.join(__dirname,  './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});

const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT} `))

// Unhandled promise rejection for database
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to technical issue`)
    server.close(() => {
        process.exit(1);
    });
});