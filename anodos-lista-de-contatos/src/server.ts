import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source'; // Certifique-se de que AppDataSource está configurado corretamente
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import cors from 'cors';
import createAdminUser from './init/initAdminUser';

dotenv.config();

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use(cors());

        app.get('/', (req, res) => {
            res.send("HELLO WORLD!");
        });
        app.use('/api', authRoutes);
        app.use('/api', contactRoutes);

        // Chamar a função para criar o usuário admin
        createAdminUser();

        const PORT = process.env.TYPEORM_PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao inicializar o aplicativo:", error);
    });
