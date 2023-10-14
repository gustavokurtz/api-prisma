import { Request, Response } from "express";
import { prisma } from "../database";

export default {
    async createAbout(request: Request, response: Response) {
        
        try {

            const { userId, city, hobby, state  } = request.body;

            const about = await prisma.about.create({ data: { userId, city, hobby, state } });

            return response.json({ error: false, message: 'Sucesso: Comentário cadastrado com sucesso!', about });

        } catch (error: any) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    
    },

    async deleteAbout(request: Request, response: Response) {
        try {
            const { id } = request.params;
            
            const about = await prisma.about.delete({ where: { id: Number(id) } });

            return response.json({ error: false, message: 'Sucesso: Comentário deletado com sucesso!', about });
        } catch (error: any) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    }
}