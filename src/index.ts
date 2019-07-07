import 'reflect-metadata';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';
import decodeJWT from './utils/decodeJWT';
import { ProfileResolver } from './modules/user/Profile';
import { User } from './entity/User';
import createJWT from './utils/createJWT';

const main = async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [ RegisterResolver, LoginResolver, ProfileResolver ]
	});
	const apolloServer = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const token = req.headers.authorization || '';
			const user = await decodeJWT(token).then((data) => {
				return data;
			});
			if (!user) throw new AuthenticationError('you must be logged in');
			return { user };
		}
	});
	const app = Express();
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.post('/get-token', async (req, res) => {
		const { email, password } = req.body;
		if (email === undefined || password === undefined) {
			res.status(401).send({
				success: false,
				message: 'Faltan campos por digitar'
			});
		}
		const user = await User.findOne({ where: { email } });
		if (user) {
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				const token = await createJWT(user.id);
				res.send({
					success: true,
					token: token
				});
			} else {
				res.status(401).send({
					success: false,
					message: 'Incorrect credentials'
				});
			}
		} else {
			res.status(404).send({
				success: false,
				message: `Could not find account: ${email}`
			});
		}
	});
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log('server started on http://localhost:4000/graphql');
	});
};

main();
