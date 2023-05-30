import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { LoginRouter } from './routes/login.router';
import { ArticleRouter } from './routes/article.router';
import ErrorHandler from './middleware/ErrorHandler';
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hey this is my Sploot app running')
})
app.use("/api", LoginRouter);
app.use("/api", ArticleRouter)

app.use(ErrorHandler);

export default app;