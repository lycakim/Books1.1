import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
              @PrimaryGeneratedColumn({
                            type: 'bigint'
              })
              id: number;

              @Column({
                            nullable: false,
                            type: 'int'
              })
              bookID: number;

              @Column({
                            type: 'timestamp',
                            default: () => 'CURRENT_TIMESTAMP'
              })
              date_liked: string;

              @Column({
                            nullable: false,
                            type: 'int'
              })
              userID: number;


}