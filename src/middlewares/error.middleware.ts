import type { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/AppError.js';

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ success: false, message: error.message });
    return;
  }
  if (error instanceof SyntaxError) {
    res.status(400).json({ success: false, message: 'JSON gửi lên sai cú pháp' });
    return;
  }
  console.error(error);
  res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
};