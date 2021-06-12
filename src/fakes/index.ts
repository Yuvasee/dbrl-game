import { internet } from "faker";

import { User } from "../state/User";

export const makeFakeUser = () => new User(internet.userName());
