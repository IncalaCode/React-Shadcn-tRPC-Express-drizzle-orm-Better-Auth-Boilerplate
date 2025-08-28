import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSync202508280910171756361417335 implements MigrationInterface {
    name = 'AutoSync202508280910171756361417335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" ALTER COLUMN "token" SET DEFAULT md5(random()::text || clock_timestamp()::text)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" ALTER COLUMN "token" SET DEFAULT md5(((random())|| (clock_timestamp())))`);
    }

}
