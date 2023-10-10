import { Request, Response } from "express";
import { prisma } from "../database";

export default {
    
    async createUser(request: Request, response: Response) {
        try {

            const {id} = request.params;
            const { name, email } = request.body;


            const userExist = await prisma.user.findUnique({ where: { email } });

            if(userExist) {
                return response.status(400).json({ error: true, message: 'Usuário já existe!' });
            }

            const user = await prisma.user.create({ data: { name, email } });

            return response.json({ error: false, message: 'Sucesso: Usuário cadastrado com sucesso!', user });
            
        } catch (error: any) {
            return response.json({ message: error.message });
        }
    }
}
