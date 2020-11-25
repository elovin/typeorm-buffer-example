import { Column, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Foo } from "./Foo.model";

@Entity()
export class Bar {
    @PrimaryColumn({ name: "uuid", type: "binary", length: 16 })
    id!: Buffer;

    @Column()
	name!: string;

	@Column({ name: "foo_id", type: "binary", length: 16 })
	fooId!: Buffer;

    @OneToOne(() => Foo, foo => foo.Bar)
    @JoinColumn({ name: "foo_id" })
    Foo!: Foo;
}
