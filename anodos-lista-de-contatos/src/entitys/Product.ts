import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { UserLogin } from "./UserLogin";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column("text")
    @IsOptional()
    @IsString()
    description: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    category: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    image: string;

    @ManyToOne(() => UserLogin, (user) => user.products)
    userId: UserLogin;
}
