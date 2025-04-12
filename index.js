import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import portfolio from './Portfolio/Route/route.js'
import tour from './Projects/Tourism/Route/route.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


dotenv.config()
const app =express()
const port = process.env.PORT || 4000  
const corsOptions = {
    origin:true,  //origin: "https://bharanidharan.in"
    credentials:true
}

//database connection
mongoose.set("strictQuery",false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected',mongoose.connection.db.databaseName);

    } catch (err) {
        console.error('Initial MongoDB connection failed:', err.message);
        process.exit(1); // Exit the application on connection failure
    }
};

// Listen for connection errors after the initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});


// Middleware
app.use(express.json({ limit: '50mb' })); // Allow up to 50MB payloads
app.use(bodyParser.json({ limit: '50mb' })); // Also allow larger payloads via body-parser
app.use(cors(corsOptions)); // CORS configuration
app.use(cookieParser());

// Routes
app.use("/portfolio",portfolio)
app.use("/tour",tour)


app.get('/test-cookies', (req, res) => {
    console.log("Cookies:", req.cookies);
    res.json({ cookies: req.cookies });
});





app.get('/', (req, res) => {
    res.send('bye from the backend!');
}); 



app.listen(port, '0.0.0.0', () => {
    connect()
    console.log(`Server running on ${port}`);
});

