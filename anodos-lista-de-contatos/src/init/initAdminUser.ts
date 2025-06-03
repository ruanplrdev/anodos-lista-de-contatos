import { AppDataSource } from '../config/data-source'; // Ajuste o caminho conforme necessário
import { UserLogin } from '../entitys/UserLogin'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
    const userLoginRepository = AppDataSource.getRepository(UserLogin);

    // Verifica se já existe um usuário admin
    const existingAdmin = await userLoginRepository.findOneBy({ role: 'admin' });
    if (existingAdmin) {
        console.log('Admin user already exists.');
        return; // Se já existe, não cria outro
    }

    // Dados do usuário admin padrão
    const adminEmail = 'user@admin.com'; // Altere para o email desejado
    const adminPassword = 'admin'; // Altere para a senha desejada

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = userLoginRepository.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
    });

    await userLoginRepository.save(adminUser);
    console.log('Admin user created successfully.');
};

export default createAdminUser;
