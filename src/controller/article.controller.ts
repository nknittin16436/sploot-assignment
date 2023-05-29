import { Inject } from "typescript-ioc";
import { ArticleService } from "../service/article.service";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../util/http-response";
export class ArticleController {
    private articleService: ArticleService;

    constructor(@Inject articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async createArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const createArticelData = req.body;
            const creatingUserId = req.params.userId;
            const resp = await this.articleService.createArticle(createArticelData, creatingUserId);
            res.status(201).json({ statusCode: 201, resp, message: "Article created Succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }

    }

    public async getArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await this.articleService.getAllArticles();
            res.status(200).json({ success: true, articles, message: "Articles fetched Succesfully" })
        } catch (error: any) {
            console.log(error)
            const httpErrorResponse = errorResponse(error.statusCode || 500, error, error.message);
            res.status(500).json(httpErrorResponse)
        }
    }
}