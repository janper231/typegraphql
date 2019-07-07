import jwt from 'jsonwebtoken';

const createJWT = (id: number): string => {
	const token = jwt.sign({ id }, 'control$0123', { expiresIn: '1h' });
	return token;
};
export default createJWT;
