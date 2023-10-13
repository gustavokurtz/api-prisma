import express, { Request, Response } from 'express'; 
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';


const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

app.post('/createUser', UserController.createUser)
app.post('/createPost', PostController.createPost)
app.get('/listPosts/:id', PostController.listPostsId)
app.get('/listPosts', PostController.listPosts)
app.get('/listUsers', UserController.listUsers)
app.get('/listUsers/:id', UserController.listUsersId)
app.put('/updatePost', PostController.updatePost)
app.put('/updateUser/:id', UserController.updateUser)
app.delete('/deletePost/:id', PostController.deletePost)
app.delete('/deleteUser/:id', UserController.deleteUser)

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});