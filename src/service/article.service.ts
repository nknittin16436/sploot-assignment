import Article from "../models/Article";
import { IArticle } from "../util/article.dto";


export class ArticleService {
    async getAllArticles() {
        const articles = await Article.find().populate('createdBy', 'name');
        throw new Error("hi")

        return articles;
    }

    async createArticle(createArticelData: IArticle, creatingUserId: string) {
        const article = await Article.create({ ...createArticelData, createdBy: creatingUserId });
        console.log(article);
        return article
    }
}