import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(@Arg('email') email: string, @Arg('password') password: string): Promise<User | null | String> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return 'Usuario/contraseña errada';
		}
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return 'Usuario/contraseña errada';
		}
		return user;
	}
}
