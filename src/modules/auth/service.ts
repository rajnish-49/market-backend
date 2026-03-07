import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/client";
import { config } from "../../config/env";
import { ApiError } from "../../utils/ApiError";
import { RegisterInput, LoginInput } from "./types";

const SALT_ROUNDS = 10;

function generateAccessToken(userId: number, role: string) {
  return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: "15m" });
}

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id, user.role);

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}
