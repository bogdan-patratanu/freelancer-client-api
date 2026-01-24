import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectStatus1769162693429 implements MigrationInterface {
    name = 'ProjectStatus1769162693429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
        await queryRunner.query(`UPDATE projects SET end_date = DATE_ADD(submit_date, INTERVAL bid_period DAY) WHERE end_date IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`status\``);
    }

}
