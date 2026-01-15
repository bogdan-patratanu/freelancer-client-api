import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectDescription1768456957193 implements MigrationInterface {
    name = 'ProjectDescription1768456957193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
