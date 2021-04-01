import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1617177018720 implements MigrationInterface {
  tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'profilePicture',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
