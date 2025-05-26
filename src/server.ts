import express from 'express';
import cors from 'cors';
import todoRoutes from './interfaces/routes/todoRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 