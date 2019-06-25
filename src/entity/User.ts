import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column({ type: 'char', length: 2, default: "A" })
	Estado: string;

	@Field()
	@Column({
		type: 'varchar',
		length: 150,
		unique: true
	})
	email: string;

	@Column() password: string;

	@Field() name: string;
}
