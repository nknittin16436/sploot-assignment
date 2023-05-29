import mongoose from "mongoose";

export interface IArticle {
    title: string;
    description: string;
    createdBy: string;
}