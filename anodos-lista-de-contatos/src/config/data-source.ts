import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserLogin } from "../entitys/UserLogin"
import { Contact } from '../entitys/Contact';
import { UserProfile } from "../entitys/UserProfile";


export const AppDataSource = new DataSource({
  "type": "postgres",
  // "host": "db",
  "host": "localhost", // descomente no modo dev
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

