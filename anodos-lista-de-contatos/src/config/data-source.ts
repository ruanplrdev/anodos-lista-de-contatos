import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserLogin } from "../entities/UserLogin"
import { Contact } from '../entities/Contact';
import { UserProfile } from "../entities/UserProfile";


export const AppDataSource = new DataSource({
  "type": "postgres",
  "host": "db",
  "port": 5432,
  "username": "postgres",
  "password": "admin",
  "database": "anodos_lista_de_contatos_db",
  "synchronize": true,  // apenas para desenvolvimento, crie as tabelas automaticamente
  "logging": true,
  "entities": [
    UserProfile,
    UserLogin,
    Contact
  ],
  "migrations": ["src/migrations/**/*.ts"],
})

