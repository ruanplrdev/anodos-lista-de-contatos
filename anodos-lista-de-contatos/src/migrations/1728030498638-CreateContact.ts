import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContact1728030498638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'contacts',
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
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'userId',
                    type: 'uuid', 
                    isNullable: false, 
                }
            ]
        }));

        await queryRunner.createForeignKey('contacts', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_login',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('contacts');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('contacts', foreignKey);
        await queryRunner.dropTable('contacts');
    }
}
