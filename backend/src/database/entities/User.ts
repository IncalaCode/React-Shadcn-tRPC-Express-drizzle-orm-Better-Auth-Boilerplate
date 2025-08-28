import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from "typeorm";
import { Session } from "./Session";
import { Account } from "./Account";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  @Index()
  email!: string;

  @Column({ type: "boolean", nullable: true, default: false })
  emailVerified?: boolean;

  @Column({ type: "varchar", nullable: true, length: 100 })
  name?: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ type: "varchar", nullable: true, length: 255 })
  password?: string;

  @Column({ type: "boolean", nullable: true, default: false })
  twoFactorEnabled?: boolean;

  @Column({ type: "varchar", nullable: true, length: 255 })
  twoFactorSecret?: string;

  @Column({ type: "text", nullable: true })
  twoFactorBackupCodes?: string;

  @Column({ type: "varchar", nullable: true, length: 50, default: "user" })
  role?: string;

  @Column({ type: "boolean", nullable: true, default: false })
  banned?: boolean;

  @Column({ type: "text", nullable: true })
  banReason?: string;

  @Column({ type: "timestamp", nullable: true })
  banExpires?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Account[];
}