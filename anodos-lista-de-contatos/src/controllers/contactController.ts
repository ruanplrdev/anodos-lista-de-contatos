import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Contact } from '../entities/Contact';
import { UserLogin } from '../entities/UserLogin';

export const createContact = async (req: Request, res: Response) => {
    try {
        const { name, phone, address, email } = req.body;
        const userRepo = AppDataSource.getRepository(UserLogin);
        const contactRepo = AppDataSource.getRepository(Contact);
    
        const user = await userRepo.findOne({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const contact = contactRepo.create({ name, address, phone, email, userId: user.id });
        await contactRepo.save(contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ message: 'Erro ao buscar contatos' });
    }
};

export const getContact = async (req: Request, res: Response) => {
    try {
        const contactRepo = AppDataSource.getRepository(Contact);

        const contacts = await contactRepo.find({
            where: { userId: {id: req.user.id} },  
            relations: ['userId'],
        });

        res.status(201).json(contacts);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ message: 'Erro ao buscar contatos' });
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    const contactRepository = AppDataSource.getRepository(Contact);

    const contact = await contactRepository.findOneBy({ id: parseInt(id) });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    await contactRepository.remove(contact);
    res.status(204).send();
};

export const updateContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID do contato a ser editado
        const { name, phone, address, email } = req.body;

        const contactRepo = AppDataSource.getRepository(Contact);
        const userRepo = AppDataSource.getRepository(UserLogin);

        // Obtenha o usuário logado
        const user = await userRepo.findOne({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Obtenha o contato a ser editado
        const contact = await contactRepo.findOne({
            where: { id: parseInt(id), userId: user.id }
        });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found or does not belong to the user' });
        }

        // Atualize os campos do contato, se fornecidos
        if (name) contact.name = name;
        if (phone) contact.phone = phone;
        if (address) contact.address = address;
        if (email) contact.email = email;

        // Salve as mudanças no banco de dados
        await contactRepo.save(contact);

        return res.status(200).json({ message: 'Contact updated successfully', contact });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};