import { body } from 'express-validator';

export const signupSchema = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
];
export const loginSchema = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const updateUserSchema = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
]
export const createArticleSchema = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
]

