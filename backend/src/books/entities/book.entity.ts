import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
              @PrimaryGeneratedColumn({
                            type: 'bigint'
              })
              id: number;

              @Column({
                            // unique: true,
                            nullable: false,
                            type: 'varchar'
              })
              book_name: string;

              @Column({
                            nullable: true,
                            type: 'text'
              })
              book_desc: string;

              @Column({
                            nullable: true,
                            type: 'varchar'
              })
              cover_image: string;

              @Column({
                            nullable: true,
                            type: 'text'
              })
              allowed_users: string;

              @Column({
                            type: 'timestamp',
                            default: () => 'CURRENT_TIMESTAMP'
              })
              date_uploaded: string;

              @Column({
                            nullable: false,
                            type: 'int'
              })
              userID: number;


}