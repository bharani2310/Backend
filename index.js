import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import portfolio from './Portfolio/Route/route.js';
import tour from './Projects/Tourism/Route/route.js';
import chat from './Projects/Chat/router/router.js';
import ecommerce from './Projects/Ecommerce/routes/route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './Projects/Chat/utils/socket.js'; 

dotenv.config();

const port = process.env.PORT || 4000;

const corsOptions = {
    origin: true,
    credentials: true
};

// ✅ MongoDB connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected:', mongoose.connection.db.databaseName);
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err.message);
});

// ✅ Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors(corsOptions));
app.use(cookieParser());

// ✅ API Routes
app.use('/portfolio', portfolio);
app.use('/tour', tour);
app.use('/chat', chat);
app.use('/ecommerce',ecommerce)

app.get('/test-cookies', (req, res) => {
    console.log("Cookies:", req.cookies);
    res.json({ cookies: req.cookies });
});

app.get('/', (req, res) => {
    res.send('bye from the backend!');
});

// ✅ Start server after DB connects
connect().then(() => {
    server.listen(port, '0.0.0.0', () => {
        console.log(`Server running with socket on port ${port}`);
    });
});
