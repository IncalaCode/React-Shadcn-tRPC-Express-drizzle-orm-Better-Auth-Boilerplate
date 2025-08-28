import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "./User";

@Entity("session")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  @Index()
  token!: string;

  @Column({ type: "varchar" })
  @Index()
  userId!: string;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @Column({ type: "varchar", nullable: true, length: 45 })
  ipAddress?: string;

  @Column({ type: "text", nullable: true })
  userAgent?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
