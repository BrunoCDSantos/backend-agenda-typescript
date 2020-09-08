/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterCompanyAddForeign1592174776429
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'people',
      new TableForeignKey({
        name: 'addForeign',
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('id_company', 'addForeign');
  }
}
