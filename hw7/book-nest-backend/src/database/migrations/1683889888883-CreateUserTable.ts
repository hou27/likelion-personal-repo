import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1683889888883 implements MigrationInterface {
  name = 'CreateUserTable1683889888883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(60) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``,
    );
  }
}

// yarn run typeorm -d src/database/ormconfig.ts migration:generate src/database/migrations/CreateUserTable
