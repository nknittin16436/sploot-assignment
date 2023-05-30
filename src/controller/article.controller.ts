import { Inject } from "typescript-ioc";
import { ArticleService } from "../service/article.service";
import { NextFunction, Request, Response } from "express";
import { getUserFromToken } from "../util/user.util";
export class ArticleController {
    private articleService: ArticleService;

    constructor(@Inject articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async createArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const createArticelData = req.body;
            const authorizationToken = req.headers.authorization as string;
            const userId = await getUserFromToken(authorizationToken);
            const article = await this.articleService.createArticle(createArticelData, userId);
            res.status(201).json({ statusCode: 201, data: article, message: "Article created Succesfully" })
        } catch (error: any) {
            next(error)
        }

    }

    public async getArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await this.articleService.getAllArticles();
            res.status(200).json({ statusCode: 200, data: { articles }, message: "Articles fetched Succesfully" })
        } catch (error: any) {
            console.log(error)
            next(error);
        }
    }
}