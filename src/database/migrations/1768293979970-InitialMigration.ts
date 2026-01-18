import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1768293979970 implements MigrationInterface {
    name = 'InitialMigration1768293979970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`miscellaneous\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`area\` varchar(50) NOT NULL, \`code\` varchar(50) NULL, \`name\` varchar(500) NOT NULL, \`data_block\` json NULL, \`position\` int NULL, \`is_active\` tinyint NULL DEFAULT 1, \`created_by\` int NULL, \`updated_by\` int NULL, \`parent_id_\` int NULL, INDEX \`IDX_eef888b87679821c57b628b7fb\` (\`created_by\`), INDEX \`IDX_83385da61b57d890ac20a14376\` (\`updated_by\`), INDEX \`IDX_a2b934419ded2fd65ecd44dd1d\` (\`area\`), INDEX \`IDX_73d583505d4840426fdd83b8df\` (\`code\`), INDEX \`IDX_91761ee93fc904da7c4c258255\` (\`name\`), INDEX \`IDX_3cb25c652856c8afd6d4d55987\` (\`position\`), INDEX \`IDX_542eaed78fe362ebb4a37c3912\` (\`is_active\`), INDEX \`IDX_a69a8e39b562be7bb929215519\` (\`parent_id_\`), UNIQUE INDEX \`IDX_6678e07f0c64d6ced8374aaad9\` (\`area\`, \`code\`, \`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_on\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(250) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` varchar(100) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`created_by\` int NULL, \`updated_by\` int NULL, INDEX \`IDX_f32b1cb14a9920477bcfd63df2\` (\`created_by\`), INDEX \`IDX_b75c92ef36f432fe68ec300a7d\` (\`updated_by\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` ADD CONSTRAINT \`FK_eef888b87679821c57b628b7fb6\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` ADD CONSTRAINT \`FK_83385da61b57d890ac20a14376d\` FOREIGN KEY (\`updated_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` ADD CONSTRAINT \`FK_a69a8e39b562be7bb929215519b\` FOREIGN KEY (\`parent_id_\`) REFERENCES \`miscellaneous\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_f32b1cb14a9920477bcfd63df2c\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b75c92ef36f432fe68ec300a7d4\` FOREIGN KEY (\`updated_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`INSERT INTO \`miscellaneous\` (\`id\`, \`created_on\`, \`updated_on\`, \`area\`, \`code\`, \`name\`, \`data_block\`, \`position\`, \`is_active\`, \`created_by\`, \`updated_by\`, \`parent_id_\`) VALUES (NULL, NULL, NULL, 'config', 'time_back_search', '24', NULL, NULL, '1', NULL, NULL, NULL);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b75c92ef36f432fe68ec300a7d4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_f32b1cb14a9920477bcfd63df2c\``);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` DROP FOREIGN KEY \`FK_a69a8e39b562be7bb929215519b\``);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` DROP FOREIGN KEY \`FK_83385da61b57d890ac20a14376d\``);
        await queryRunner.query(`ALTER TABLE \`miscellaneous\` DROP FOREIGN KEY \`FK_eef888b87679821c57b628b7fb6\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_b75c92ef36f432fe68ec300a7d\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_f32b1cb14a9920477bcfd63df2\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6678e07f0c64d6ced8374aaad9\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_a69a8e39b562be7bb929215519\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_542eaed78fe362ebb4a37c3912\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_3cb25c652856c8afd6d4d55987\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_91761ee93fc904da7c4c258255\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_73d583505d4840426fdd83b8df\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_a2b934419ded2fd65ecd44dd1d\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_83385da61b57d890ac20a14376\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP INDEX \`IDX_eef888b87679821c57b628b7fb\` ON \`miscellaneous\``);
        await queryRunner.query(`DROP TABLE \`miscellaneous\``);
    }

}
