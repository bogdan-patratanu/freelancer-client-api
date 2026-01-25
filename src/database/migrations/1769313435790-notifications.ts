import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1769313435790 implements MigrationInterface {
    name = 'Notifications1769313435790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`subject\` varchar(250) NOT NULL, \`body\` varchar(250) NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`data_block\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`display_type\` varchar(20) NOT NULL DEFAULT 'notSet'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`display_type\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
