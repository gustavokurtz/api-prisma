import { Request, Response } from "express";
import { prisma } from "../database";
import { About } from '@prisma/client'

export default {
    async createAbout(request: Request, response: Response): Promise<Response<About, Record<string, any>>>{
        
        try {

            const { userId, city, hobby, state  } = request.body;

            const about = await prisma.about.create({ data: { userId, city, hobby, state } });

            return response.status(201).json({ error: false, message: 'Sucesso: Comentário cadastrado com sucesso!', about });

        } catch (error) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    
    },

    async deleteAbout(request: Request, response: Response): Promise<Response<About, Record<string, any>>> {
        try {
            const { id } = request.params;
            
            const about = await prisma.about.delete({ where: { id: Number(id) } });

            return response.status(204).json()
        } catch (error) {
            return response.status(400).json({ message: 'Algo inesperado aconteceu!' });
        }
    }
}