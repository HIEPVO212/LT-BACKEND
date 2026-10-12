import { sequelize } from '../config/database.js';

async function main(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('DB connected: QuanLySinhVienDB');
  } catch (error) {
    console.error('Kết nối DB thất bại:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

void main();