import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatusColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 1 })
  status: string;

  @Column('varchar')
  color: string;
}
