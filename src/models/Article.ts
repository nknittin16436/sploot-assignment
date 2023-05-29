import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;