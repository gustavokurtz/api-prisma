import express, { Request, Response } from 'express'; 
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import LikeController from './controllers/LikeController';


const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

// rotas post
app.post('/createUser', UserController.createUser)
app.post('/createPost', PostController.createPost)
app.post('/createLike', LikeController.createLike)

// rotas de listagem
app.get('/listPosts/:id', PostController.listPostsId)
app.get('/listPosts', PostController.listPosts)
app.get('/listUsers', UserController.listUsers)
app.get('/listUsers/:id', UserController.listUsersId)

// rotas de update 
app.put('/updatePost', PostController.updatePost)
app.put('/updateUser/:id', UserController.updateUser)

// rotas de delete
app.delete('/deletePost/:id', PostController.deletePost)
app.delete('/deleteUser/:id', UserController.deleteUser)

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});