import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1768362323645 implements MigrationInterface {
    name = 'Migrations1768362323645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`remote_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`categories\` json NULL, \`seoUrl\` varchar(255) NOT NULL, \`local\` tinyint NOT NULL, \`created_by\` int NULL, \`updated_by\` int NULL, INDEX \`IDX_89ea6fbd65bfcb7092bb9a5454\` (\`created_by\`), INDEX \`IDX_3c3095ac6be4ca001581c7abcf\` (\`updated_by\`), INDEX \`IDX_54c2ec3c5ed5d7c7264f0f4d76\` (\`remote_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`skills\` ADD CONSTRAINT \`FK_89ea6fbd65bfcb7092bb9a5454e\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skills\` ADD CONSTRAINT \`FK_3c3095ac6be4ca001581c7abcff\` FOREIGN KEY (\`updated_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skills\` DROP FOREIGN KEY \`FK_3c3095ac6be4ca001581c7abcff\``);
        await queryRunner.query(`ALTER TABLE \`skills\` DROP FOREIGN KEY \`FK_89ea6fbd65bfcb7092bb9a5454e\``);
        await queryRunner.query(`DROP INDEX \`IDX_54c2ec3c5ed5d7c7264f0f4d76\` ON \`skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3095ac6be4ca001581c7abcf\` ON \`skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_89ea6fbd65bfcb7092bb9a5454\` ON \`skills\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
    }

}
