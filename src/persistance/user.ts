import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 100,
    })
    username!: string

    @Column({
        length: 100,
    })
    email!: string

    @Column ({
        length: 100,
    })
    password!: string

    @Column ({
        length: 100,
    })
    password2!: string

    constructor(username: string, email: string, password: string, password2: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.password2 = password2;
    }

}