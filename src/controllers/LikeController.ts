import { Request, Response } from "express";
import { prisma } from "../database";
import { Likes } from "@prisma/client";

export default {
    async createLike(
        request: Request,
        response: Response
    ): Promise<Response<Likes, Record<string, any>>> {
        try {
            const { postId, userId, curtidas } = request.body;

            const like = await prisma.likes.create({
                data: { postId, userId, curtidas },
            });

            return response.status(201).json({
                error: false,
                message: "Sucesso: Like cadastrado com sucesso!",
                like,
            });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu" });
        }
    },

    async deleteLike(
        request: Request,
        response: Response
    ): Promise<Response<Likes, Record<string, any>>> {
        try {
            const { id } = request.params;

            await prisma.likes.delete({ where: { id: Number(id) } });

            return response.status(204).json();
        } catch (error) {
            return response
                .status(400)
                .json({ message: "Algo inesperado aconteceu!" });
        }
    },
};
