import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSync202508280859161756360756618 implements MigrationInterface {
    name = 'AutoSync202508280859161756360756618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" ALTER COLUMN "token" SET DEFAULT md5(random()::text || clock_timestamp()::text)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" ALTER COLUMN "token" SET DEFAULT md5(((random())|| (clock_timestamp())))`);
    }

}
