import { Request, Response } from "express";
import { prisma } from "../database";

export default {
    async createComment(request: Request, response: Response) {
        
        try {

            const { content, userId, postId } = request.body;

            const comment = await prisma.comment.create({ data: { content, userId, postId } });

            return response.json({ error: false, message: 'Sucesso: Comentário cadastrado com sucesso!', comment });

        } catch (error: any) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    
    },

    async deleteComment(request: Request, response: Response) {
        try {
            
            const  { id } = request.params;

            await prisma.comment.delete({ where: { id: Number(id) } });

            return response.json({ error: false, message: 'Sucesso: Comentário deletado com sucesso!' });
            


        } catch (error: any) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }   
    }

}