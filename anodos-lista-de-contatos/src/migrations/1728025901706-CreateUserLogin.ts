import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLogins1728025901706 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_login',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'varchar',
                },
                {
                    name: 'profile',
                    type: 'uuid',
                    isNullable: false,
                }
            ]
        }));

         // Criação da chave estrangeira para a tabela user_profile
        await queryRunner.createForeignKey('user_login', new TableForeignKey({
            columnNames: ['profile'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_profile',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user_login');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('profileId') !== -1);
        await queryRunner.dropForeignKey('profileId', foreignKey);
        await queryRunner.dropTable('user_login');
    }
}
