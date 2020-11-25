import { getConnection, createConnection, getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Bar } from "./Entities/Bar.model";
import { Foo } from "./Entities/Foo.model";

class App {
	public static async start() {

		await createConnection({
			synchronize: true,
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "test",
			entities: [Foo, Bar],
			logging: true,
		});

		const fooId = Buffer.from(uuidv4().replace(/-/g,''), 'hex');
		
		// Inserting Foo
		await getConnection().transaction(async transactionalEntityManager => {
			const fooRepository = getRepository(Foo);
			const foo = fooRepository.create({
				id: fooId,
				name: "Foo v1",
			});

			await transactionalEntityManager.save(foo);
		});

		// Updating Foo
		await getConnection().transaction(async transactionalEntityManager => {
			const fooRepository = getRepository(Foo);
			const foo = await fooRepository.findOne({ id: fooId });

			if(!foo) {
				throw new Error('Foo not found')
			}

			fooRepository.merge(foo, {
				name: 'Foo v2',
			});

			await transactionalEntityManager.save(foo);
		});

		// Inserting Bar with Foo relationship
		await getConnection().transaction(async transactionalEntityManager => {
			const fooRepository = getRepository(Foo);
			const foo = await fooRepository.findOne({ id: fooId });

			if(!foo) {
				throw new Error('Foo not found')
			}

			const barRepository = getRepository(Bar);
			const bar = barRepository.create({
				id: Buffer.from(uuidv4(), 'utf8'),
				name: "Bar v1",
				Foo: foo,
			});

			await transactionalEntityManager.save(bar);
		});
	}
}

App.start();
