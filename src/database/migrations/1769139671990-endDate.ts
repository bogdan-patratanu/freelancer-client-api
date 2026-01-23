import { MigrationInterface, QueryRunner } from "typeorm";

export class EndDate1769139671990 implements MigrationInterface {
    name = 'EndDate1769139671990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`end_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`end_date\``);
    }

}
