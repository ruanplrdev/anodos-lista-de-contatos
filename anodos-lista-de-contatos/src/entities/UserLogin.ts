import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Contact } from './Contact';
import { UserProfile } from './UserProfile';

@Entity()
export class UserLogin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: 'admin' | 'user';

    @OneToMany(() => Contact, (contact) => contact.userId)
    contacts: Contact[];

    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile;

}
