import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class ProfileResolver {
	@Query(() => User)
	async Perfil(@Arg('email') email: string): Promise<User | undefined> {
		const user = await User.findOne({ where: { email } });
		return user;
	}
}
