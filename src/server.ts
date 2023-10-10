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
app.get('/listPosts/:id', PostController.listPosts)
app.put('/updatePost', PostController.updatePost)
app.delete('/deletePost/:id', PostController.deletePost)

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});