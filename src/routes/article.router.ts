import express from 'express';
import { Container } from 'typescript-ioc';
import { LoginController } from '../controller/login.controller';
import { authenticateUser } from '../middleware/Authentication';
import { ArticleController } from '../controller/article.controller';
import { createArticleSchema } from '../util/validationSchema';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express-serve-static-core';

const router = express.Router();


const articleController: ArticleController = Container.get(ArticleController);

router.post("/users/:userId/articles", createArticleSchema, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
        return res.status(400).json({ statusCode: 400, error: errorMessages, message: "Invalid input data" });
    }
    articleController.createArticle(req, res, next);
});

router.get("/articles", (req: Request, res: Response, next: NextFunction) => {
    articleController.getArticles(req, res, next);
});

export { router as ArticleRouter };