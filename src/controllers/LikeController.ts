import { Request, Response } from "express";
import { prisma } from "../database";

export default {
 async createLike(request: Request, response: Response) {
    try {
        
        const { postId, userId, curtidas } = request.body;

        const like = await prisma.likes.create({ data: { postId, userId, curtidas } });

        return response.json({ error: false, message: 'Sucesso: Like cadastrado com sucesso!', like });


    } catch (error: any) {
        return response.status(400).json({ message: 'Algo inesperado aconteceu' });
    }
        
    }
}
