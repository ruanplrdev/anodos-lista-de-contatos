import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import cors from 'cors';

dotenv.config();

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res)=>{
        res.send("HELLO WORLD!")
    })
    app.use('/api', authRoutes);
    app.use('/api', contactRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
