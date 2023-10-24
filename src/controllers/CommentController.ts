import { Request, Response } from "express";
import { prisma } from "../database";
import { Comment } from '@prisma/client'

export default {
    async createComment(request: Request, response: Response): Promise<Response<Comment, Record<string, any>>> {
        
        try {

            const { content, userId, postId } = request.body;

            const comment = await prisma.comment.create({ data: { content, userId, postId } });

            return response.status(201).json({ error: false, message: 'Sucesso: Comentário cadastrado com sucesso!', comment });

        } catch (error) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    
    },

    async deleteComment(request: Request, response: Response): Promise<Response<Comment, Record<string, any>>>  {
        try {
            
            const  { id } = request.params;

            await prisma.comment.delete({ where: { id: Number(id) } });

            return response.status(204).json()
            


        } catch (error) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }   
    }

}