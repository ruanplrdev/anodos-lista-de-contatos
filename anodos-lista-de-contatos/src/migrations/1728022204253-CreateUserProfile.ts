import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfile1728022204253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_profile',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'address',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_profile');
    }

}
