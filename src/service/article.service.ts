import Article from "../models/Article";
import { IArticle } from "../util/article.dto";


export class ArticleService {
    async getAllArticles() {
        const articles = await Article.find().populate('createdBy', 'name');
        return articles;
    }

    async createArticle(createArticelData: IArticle, creatingUserId: string) {
        const article = await Article.create({ ...createArticelData, createdBy: creatingUserId });
        return { article, success: true };
    }
}