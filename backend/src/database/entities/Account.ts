import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "./User";

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  @Index()
  userId!: string;

  @Column({ type: "varchar", length: 255 })
  accountId!: string;

  @Column({ type: "varchar", length: 100 })
  providerId!: string;

  @Column({ type: "text", nullable: true })
  accessToken?: string;

  @Column({ type: "text", nullable: true })
  refreshToken?: string;

  @Column({ type: "text", nullable: true })
  idToken?: string;

  @Column({ type: "timestamp", nullable: true })
  accessTokenExpiresAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  refreshTokenExpiresAt?: Date;

  @Column({ type: "varchar", nullable: true, length: 255 })
  scope?: string;

  @Column({ type: "varchar", nullable: true, length: 255 })
  password?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
