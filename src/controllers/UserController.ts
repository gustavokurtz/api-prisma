import { Request, Response } from "express";
import { prisma } from "../database";


export default {
    
    async createUser(request: Request, response: Response) {
        try {

            const {id} = request.params;
            const { name, email, password } = request.body;


            const userExist = await prisma.user.findUnique({ where: { email } });

            if(userExist) {
                return response.status(400).json({ error: true, message: 'Usuário já existe!' });
            }

            const user = await prisma.user.create({ data: { name, email, password } });

            return response.json({ error: false, message: 'Sucesso: Usuário cadastrado com sucesso!', user });
            
        } catch (error: any) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }
    },

    async listUsers(request: Request, response: Response) {
        try {
            const users = await prisma.user.findMany({
                include: {
                    Post: true, // Inclua os posts relacionados a cada usuário
                    Likes: true, // Inclua os likes relacionados a cada usuário
                    Comment: true, // Inclua os comentários relacionados a cada post
                    About: true, // Inclua os comentários relacionados a cada post
                }
            });
    
            return response.json({ error: false, users });
        } catch (error: any) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }
    },
    
    async listUsersId(request: Request, response: Response) {
        try {

            const { id } = request.params;

            const user = await prisma.user.findUnique({
                 where: { id: Number(id) },
                include:{
                    Post: true, // Inclua os posts relacionados a cada usuário
                    Likes: true, // Inclua os likes relacionados a cada usuário
                    Comment: true, // Inclua os comentários relacionados a cada post
                    About: true, // Inclua os comentários relacionados a cada post
                }
                });

            if(!user){
                return response.status(400).json({ error: true, message: 'Erro: user não encontrado!' });
            }

            return response.json({ error: false, message: 'Sucesso: users listados com sucesso!', user });
            
        } catch (error: any) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }
    },

    async deleteUser(request: Request, response: Response) {
        try {
      
          const { id } = request.params;
      
          const userExists = await prisma.user.findUnique({ where: { id: Number(id) } });
      
          if (!userExists) {
            return response.status(400).json({ error: true, message: 'Erro: user não encontrado!' });
          }
      

          await prisma.about.deleteMany({ where: { userId: Number(id) } });

            await prisma.likes.deleteMany({ where: { userId: Number(id) } });

            await prisma.comment.deleteMany({ where: { userId: Number(id) } });

            await prisma.post.deleteMany({ where: { userId: Number(id) } });

            

          // Exclui todos os posts do usuário
          await prisma.post.deleteMany({ where: { userId: Number(id) } });
      
          // Exclui o usuário
          const user = await prisma.user.delete({
            where: { id: Number(request.params.id) },
          });
      
          return response.json({
            error: false,
            message: 'Sucesso: user deletado com sucesso!',
            user,
          });
      
        } catch (error: any) {
          return response.status(400).json({ message: error.message });
        }
      },

    async updateUser(request: Request, response: Response) {
        try {
        
            const { id } = request.params;
            const { name, email } = request.body;

            const userExists = await prisma.user.findUnique({ where: { id: Number(id) }});

            if(!userExists){
                return response.status(400).json({ error: true, message: 'Erro: user não encontrado!' });
            }

            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email },
            });

            return response.json({ 
                error: false, message: 'Sucesso: user editado com sucesso!', user 
            });

        } catch (error: any) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }

    }

    
}