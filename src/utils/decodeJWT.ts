import jwt from "jsonwebtoken";
import { User } from "../entity/User";

const decodeJWT = async (token: string): Promise<User | undefined | false> => {
  try {
    const decodedToken: any = jwt.verify(token, "control$0123");
    const { id } = decodedToken;
    const user = await User.findOne({ id });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export default decodeJWT;
