import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskUpdate1768640746868 implements MigrationInterface {
    name = 'TaskUpdate1768640746868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`result\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`result\``);
    }

}
