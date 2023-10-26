import { Request, Response } from "express";
import { prisma } from "../database";
import jwt from "jsonwebtoken";
import { user } from "@prisma/client";
import bcrypt from "bcrypt";

export default {
    async createUser(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const { name, email, password } = request.body;

            // Criptografar a senha antes de armazená-la
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword },
            });

            return response.status(201).json({
                error: false,
                message: "Sucesso: Usuário cadastrado com sucesso!",
                user,
            });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu" });
        }
    },

    async login(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const { email, password } = request.body;

            // Buscar usuário no banco de dados
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return response
                    .status(400)
                    .json({ message: "Usuário não encontrado" });
            }

            // Comparar a senha fornecida com a senha do usuário
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                return response.status(400).json({ message: "Senha inválida" });
            }

            const token = jwt.sign(
                { userId: user.id },
                "a3Z9#Kl$29!sDl2@0%^78Gh13*612#",
                {
                    expiresIn: "1h",
                }
            );

            // Se a senha for válida, o usuário será autenticado
            return response.status(200).json({
                error: false,
                message: "Sucesso: Usuário autenticado com sucesso!",
                user,
                token,
            });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu" });
        }
    },

    async getLoggedInUsers(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            // Verificar o token JWT fornecido na requisição
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                return response
                    .status(401)
                    .json({ message: "Token não fornecido" });
            }

            const [, token] = authHeader.split(" ");

            try {
                const decoded = jwt.verify(
                    token,
                    "a3Z9#Kl$29!sDl2@0%^78Gh13*612#"
                ) as { userId: string };

                // O token é válido, buscar o usuário correspondente
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                });

                if (!user) {
                    return response
                        .status(404)
                        .json({ message: "Usuário não encontrado" });
                }

                // Retornar o usuário
                return response.status(200).json(user);
            } catch {
                return response.status(401).json({ message: "Token inválido" });
            }
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu" });
        }
    },

    async listUsersLogin(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    Post: true, // Inclua os posts relacionados a cada usuário
                    Likes: true, // Inclua os likes relacionados a cada usuário
                    Comment: true, // Inclua os comentários relacionados a cada post
                    About: true, // Inclua os comentários relacionados a cada post
                },
            });

            return response.status(200).json({ error: false, users });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu" });
        }
    },

    async listUsers(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    Post: true, // Inclua os posts relacionados a cada usuário
                    Likes: true, // Inclua os likes relacionados a cada usuário
                    Comment: true, // Inclua os comentários relacionados a cada post
                    About: true, // Inclua os comentários relacionados a cada post
                },
            });

            return response.json({ error: false, users });
        } catch (error) {
            return response.json({ message: "Algo inesperado aconteceu" });
        }
    },

    async listUsersId(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const { id } = request.params;

            const user = await prisma.user.findUnique({
                where: { id: String(id) },
                include: {
                    Post: true, // Inclua os posts relacionados a cada usuário
                    Likes: true, // Inclua os likes relacionados a cada usuário
                    Comment: true, // Inclua os comentários relacionados a cada post
                    About: true, // Inclua os comentários relacionados a cada post
                },
            });

            if (!user) {
                return response.status(400).json({
                    error: true,
                    message: "Erro: user não encontrado!",
                });
            }

            return response.json({
                error: false,
                message: "Sucesso: users listados com sucesso!",
                user,
            });
        } catch (error) {
            return response.json({ message: "Algo inesperado aconteceu" });
        }
    },

    async deleteUser(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const { id } = request.params;

            const userExists = await prisma.user.findUnique({
                where: { id: String(id) },
            });

            if (!userExists) {
                return response.status(400).json({
                    error: true,
                    message: "Erro: user não encontrado!",
                });
            }

            await prisma.about.deleteMany({ where: { userId: String(id) } });

            await prisma.likes.deleteMany({ where: { userId: String(id) } });

            await prisma.comment.deleteMany({ where: { userId: String(id) } });

            await prisma.post.deleteMany({ where: { userId: String(id) } });

            // Exclui o usuário
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const user = await prisma.user.delete({
                where: { id: String(request.params.id) },
            });

            return response.status(204).json();
        } catch (error) {
            return response
                .status(400)
                .json({ message: "User não encontrado!" });
        }
    },

    async updateUser(
        request: Request,
        response: Response
    ): Promise<Response<user, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { name, email } = request.body;

            const userExists = await prisma.user.findUnique({
                where: { id: String(id) },
            });

            if (!userExists) {
                return response.status(400).json({
                    error: true,
                    message: "Erro: user não encontrado!",
                });
            }

            const user = await prisma.user.update({
                where: { id: String(id) },
                data: { name, email },
            });

            return response.json({
                error: false,
                message: "Sucesso: user editado com sucesso!",
                user,
            });
        } catch (error) {
            return response.json({ message: "Algo inesperado aconteceu" });
        }
    },
};
