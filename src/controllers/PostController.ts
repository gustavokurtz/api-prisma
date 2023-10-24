import { Request, Response } from "express";
import { prisma } from "../database";
import { Post } from '@prisma/client'

export default {
    
    async createPost(request: Request, response: Response): Promise<Response<Post, Record<string, any>>> {
        try {
            const { title, content, userId } = request.body;
            

            const post = await prisma.post.create({ data: { title, content, userId } });

            return response.status(201).json({ error: false, message: 'Sucesso: Post cadastrado com sucesso!', post });
            
        } catch (error) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }
    },

    async listPostsId(request: Request, response: Response): Promise<Response<Post, Record<string, any>>> {
        try {
          const { id } = request.params;
      
          const post = await prisma.post.findUnique({
            include: {
              author: true, // Inclua o usuário que criou o post
              Likes: true, // Inclua os likes relacionados a cada post
              Comment: true, // Inclua os comentários relacionados a cada post
            },
            where: { id: Number(id) },
          });
      
          if (!post) {
            return response.status(400).json({ error: true, message: 'Erro: Post não encontrado!' });
          }
      
          return response.json({ error: false, message: 'Sucesso: Posts listados com sucesso!', post });
        } catch (error) {
          return response.json({ message: 'Algo inesperado aconteceu' });
        }
      },


      async listPosts(request: Request, response: Response): Promise<Response<Post, Record<string, any>>> {
        
        try {
            
           const posts = await prisma.post.findMany({
                include: {
                    author: true, // Inclua o usuário que criou o post
                    Likes: true, // Inclua os likes relacionados a cada post
                    Comment: true, // Inclua os comentários relacionados a cada post
                    
                }
           }) 
           return response.json({ error: false, posts });

        } catch (error) {
            return response.json({ message: 'Algo inesperado aconteceu' }); 
        }
      },

    

    async updatePost(request: Request, response: Response): Promise<Response<Post, Record<string, any>>> {
        try {

            const { id, title, content } = request.body;

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) }});

            if(!postExists){
                return response.status(400).json({ error: true, message: 'Erro: Post não encontrado!' });
            }


            const post = await prisma.post.update({ where: { id: Number(request.body.id) }, data: { title, content } });



            return response.json({ 
                error: false, message: 'Sucesso: Post atualizado com sucesso!', post 
            });
            
        } catch (error) {
            return response.json({ message: 'Algo inesperado aconteceu' });
        }
    },


    async deletePost(request: Request, response: Response): Promise<Response<Post, Record<string, any>>> {
        try {
          const { id } = request.params;
      
          const postExists = await prisma.post.findUnique({ where: { id: Number(id) }});
      
          if (!postExists) {
            return response.status(400).json({ error: true, message: 'Erro: Post não encontrado!' });
          }
                
      
          // Finalmente, exclua o post em si
          const deletedPost = await prisma.post.delete({ where: { id: Number(id) }});
      
          return response.status(204).json()
      
        } catch (error) {
          return response.json({ message: 'Algo inesperado aconteceu' });
        }
      }
    

    

}
