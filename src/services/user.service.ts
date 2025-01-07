import { User } from "@prisma/client";
import { CreateUserDto, SignInDto } from "../dtos/user.dto";
import { repository } from "../database/prisma.connection";
import { HTTPError } from "../utils/http.error";
import { randomUUID } from "crypto";

export class UserService {
  public async create(dto: CreateUserDto): Promise<void> {
    const userFound = await repository.user.findUnique({
      where: { username: dto.username },
    });

    if (userFound) {
      throw new HTTPError(409, "Nome de usuário indisponível.");
    }

    const newUser = await repository.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: dto.password,
        username: dto.username,
      },
    });
  }

  public async signIn(dto: SignInDto): Promise<Omit<User, "password">> {
    let userFound = await repository.user.findUnique({
      where: { username: dto.username, password: dto.password },
    });

    if (!userFound) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const token = randomUUID();

    userFound = await repository.user.update({
      where: { id: userFound.id },
      data: { authToken: token },
    });

    const user = { ...userFound, password: undefined };

    return user;
  }

  public async getByToken(
    authToken: string
  ): Promise<Omit<User, "password"> | null> {
    const user = await repository.user.findFirst({
      where: { authToken },
    });

    if (!user) return null;

    return user;
  }
}
