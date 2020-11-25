import { Column, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Bar } from "./Bar.model";

@Entity()
export class Foo {
    @PrimaryColumn({ name: "uuid", type: "binary", length: 16 })
    id!: Buffer;

    @Column()
    name!: string;

	@OneToOne(() => Bar, bar => bar.Foo)
    Bar: Bar;
}
