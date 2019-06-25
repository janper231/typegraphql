import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
//modules
import { ResgisterResolver } from "./modules/user/Register";


const main = async () => {
    await createConnection();
	const schema = await buildSchema({
		resolvers: [ ResgisterResolver ]
	});
	const apolloserver = new ApolloServer({ schema });
	const app = Express();
    apolloserver.applyMiddleware({ app });
    app.listen(4000, () =>{
        console.log("server started on http://:localhost:4000")
    });
};
main();
