import Article from "../models/Article";


export class ArticleService {
    async getAllArticles() {
        const articles = await Article.find().populate('createdBy', 'name age');
        return articles;
    }
}