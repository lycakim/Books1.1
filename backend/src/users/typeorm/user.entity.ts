import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
              @PrimaryGeneratedColumn({
                            type: 'bigint'
              })
              id: number;

              @Column({
                            unique: true,
                            nullable: false,
                            type: 'varchar'
              })
              username: string;

              @Column({
                            nullable: true,
                            type: 'varchar'
              })
              password: string;

              @Column({
                            nullable: true,
                            type: 'varchar'
              })
              firstname: string;

              @Column({
                            nullable: true,
                            type: 'varchar'
              })
              middlename: string;

              @Column({
                            nullable: true,
                            type: 'varchar'
              })
              lastname: string;

              @Column({
                            default: false,
                            type: 'tinyint'
              })
              isValidated: boolean;


}