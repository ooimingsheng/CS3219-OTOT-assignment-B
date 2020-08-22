import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserData } from "../types/users";

@Entity()
export class User {
  entityName = "User";

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column({ type: "character varying", nullable: false })
  email!: string;

  @Column({ type: "character varying", nullable: false })
  name!: string;

  toJson = (): UserData => ({
    id: this.id,
    email: this.email,
    name: this.name,
  });
}
