import 'dotenv/config';
import { Sequelize } from 'sequelize';

function layBien(ten: string): string {
  const giaTri = process.env[ten];
  if (!giaTri) throw new Error(`Thiếu biến môi trường ${ten} trong .env`);
  return giaTri;
}

const port = Number.parseInt(layBien('DB_PORT'), 10);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT phải là số nguyên từ 1 đến 65535');
}

export const sequelize = new Sequelize(
  layBien('DB_NAME'),
  layBien('DB_USER'),
  layBien('DB_PASSWORD'),
  {
    dialect: 'mssql',
    host: layBien('DB_HOST'),
    port,
    logging: console.log,
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT !== 'false',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
      },
    },
  },
);