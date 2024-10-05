import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { UserLogin } from '../entities/UserLogin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserProfile } from '../entities/UserProfile';

export const register = async (req: Request, res: Response) => {
    const { email, password, name, address, phone, role } = req.body;
    const userLoginRepository = AppDataSource.getRepository(UserLogin);
    const userProfileRepository = AppDataSource.getRepository(UserProfile);
    const existingUser = await userLoginRepository.findOneBy({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userLogin = userLoginRepository.create({
        email,
        password: hashedPassword,
        role
    });
    if (name || address || phone) {
        const profile = userProfileRepository.create({
            name:name ||'',
            address:address || '',
            phone:phone ||'',
        });
        await userProfileRepository.save(profile);

        userLogin.profile = profile;
    }
    await userLoginRepository.save(userLogin);

    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(UserLogin);

    const user = await userRepository.findOneBy({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
