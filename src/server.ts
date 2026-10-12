import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config.js';
import { accessLogger } from './middlewares/access-log.middleware.js';
import sinhVienRoutes from './routes/sinhVien.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Gắn middleware ghi log Morgan
app.use(accessLogger);

// Các middleware cơ bản
app.use(helmet());
app.use(express.json());

// Gắn Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gắn Router Sinh Viên
app.use('/api/v1/sinh-vien', sinhVienRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});