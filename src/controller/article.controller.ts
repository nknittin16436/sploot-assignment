import { Inject } from "typescript-ioc";
import { ArticleService } from "../service/article.service";
import { Response } from "express";
export class ArticleController {
    private articleService: ArticleService;

    constructor(@Inject articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async getArticles(res: Response) {
        try {
            const articles = await this.articleService.getAllArticles();
            res.status(200).json({ success: true, articles, message: "Articles fetched Succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}