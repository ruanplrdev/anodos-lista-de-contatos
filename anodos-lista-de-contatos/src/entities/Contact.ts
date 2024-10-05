import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { UserLogin } from './UserLogin';

@Entity()
export class Contact {
    @Unique(['userId', 'email'])
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @ManyToOne(() => UserLogin, (user) => user.contacts)
    userId: UserLogin;
}
