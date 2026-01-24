import { MigrationInterface, QueryRunner } from "typeorm";

export class Bids1769221038971 implements MigrationInterface {
    name = 'Bids1769221038971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`bids\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`bids\``);
    }

}
