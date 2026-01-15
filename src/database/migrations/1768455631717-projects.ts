import { MigrationInterface, QueryRunner } from "typeorm";

export class Projects1768455631717 implements MigrationInterface {
    name = 'Projects1768455631717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`remote_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`seo_url\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`jobs\` json NULL, \`submit_date\` datetime NOT NULL, \`type\` varchar(20) NOT NULL, \`bid_period\` int NOT NULL, \`budget\` json NULL, \`hourly_project_info\` json NULL, \`bid_stats\` json NULL, \`time_submited\` datetime NOT NULL, \`time_updated\` datetime NOT NULL, \`language\` varchar(20) NOT NULL, \`location\` json NULL, \`true_location\` json NULL, \`owner_info\` json NULL, \`created_by\` int NULL, \`updated_by\` int NULL, INDEX \`IDX_8a7ccdb94bcc8635f933c8f808\` (\`created_by\`), INDEX \`IDX_458ce18ebdb792c80257bc9667\` (\`updated_by\`), INDEX \`IDX_d44cb37b364850d1db6bd4be30\` (\`remote_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_8a7ccdb94bcc8635f933c8f8080\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_458ce18ebdb792c80257bc96678\` FOREIGN KEY (\`updated_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_458ce18ebdb792c80257bc96678\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_8a7ccdb94bcc8635f933c8f8080\``);
        await queryRunner.query(`DROP INDEX \`IDX_d44cb37b364850d1db6bd4be30\` ON \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_458ce18ebdb792c80257bc9667\` ON \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a7ccdb94bcc8635f933c8f808\` ON \`projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}
