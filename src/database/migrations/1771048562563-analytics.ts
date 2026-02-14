import { MigrationInterface, QueryRunner } from "typeorm";

export class Analytics1771048562563 implements MigrationInterface {
    name = 'Analytics1771048562563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`analytics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active_start_count\` int NOT NULL, \`active_end_count\` int NOT NULL, \`data\` json NULL, \`created_by\` int NULL, \`updated_by\` int NULL, INDEX \`IDX_7c5fcdc19bd9bb518329ec0cc0\` (\`created_by\`), INDEX \`IDX_1178c0129ec5b7746cd22df9bd\` (\`updated_by\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`analytic_payload\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint(1) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`analytics\` ADD CONSTRAINT \`FK_7c5fcdc19bd9bb518329ec0cc0d\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`analytics\` ADD CONSTRAINT \`FK_1178c0129ec5b7746cd22df9bdb\` FOREIGN KEY (\`updated_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analytics\` DROP FOREIGN KEY \`FK_1178c0129ec5b7746cd22df9bdb\``);
        await queryRunner.query(`ALTER TABLE \`analytics\` DROP FOREIGN KEY \`FK_7c5fcdc19bd9bb518329ec0cc0d\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`processed\` \`processed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`analytic_payload\``);
        await queryRunner.query(`DROP INDEX \`IDX_1178c0129ec5b7746cd22df9bd\` ON \`analytics\``);
        await queryRunner.query(`DROP INDEX \`IDX_7c5fcdc19bd9bb518329ec0cc0\` ON \`analytics\``);
        await queryRunner.query(`DROP TABLE \`analytics\``);
    }

}
