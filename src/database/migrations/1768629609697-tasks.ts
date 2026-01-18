import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1768629609697 implements MigrationInterface {
    name = 'Tasks1768629609697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`processed\` tinyint(1) NOT NULL DEFAULT 0, \`status\` varchar(20) NOT NULL, \`handler\` varchar(50) NOT NULL, \`payload\` json NOT NULL, \`start_processing_time\` timestamp NULL, \`end_processing_time\` timestamp NULL, INDEX \`IDX_4ff32e61425402b38c51b0c12d\` (\`processed\`), INDEX \`IDX_6086c8dafbae729a930c04d865\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6086c8dafbae729a930c04d865\` ON \`tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ff32e61425402b38c51b0c12d\` ON \`tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
