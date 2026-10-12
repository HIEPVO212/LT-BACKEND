import type { ISinhVienDTO } from '../dtos/sinhVien.dto.js';
import { SinhVien } from '../models/SinhVien.js';
import { AppError } from '../utils/AppError.js';

export const layDanhSachSinhVien = async (): Promise<ISinhVienDTO[]> => {
  const sinhViens = await SinhVien.findAll({
    order: [['maSV', 'ASC']]
  });
  return sinhViens.map(sv => ({
    maSV: sv.maSV,
    hoTen: sv.hoTen,
    email: sv.email,
    maLop: sv.maLop
  }));
};

export const timSinhVienTheoMa = async (maSV: string): Promise<ISinhVienDTO | undefined> => {
  const sv = await SinhVien.findByPk(maSV);
  if (!sv) return undefined;
  return {
    maSV: sv.maSV,
    hoTen: sv.hoTen,
    email: sv.email,
    maLop: sv.maLop
  };
};

export const themSinhVien = async (input: unknown): Promise<ISinhVienDTO> => {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    throw new AppError(400, 'Dữ liệu đầu vào phải là một object');
  }

  const { maSV, hoTen, email, maLop } = input as Record<string, unknown>;

  if (typeof maSV !== 'string' || typeof hoTen !== 'string' || typeof email !== 'string' || typeof maLop !== 'string') {
    throw new AppError(400, 'Tất cả các trường maSV, hoTen, email, maLop phải là chuỗi');
  }

  const maSVTrim = maSV.trim();
  const hoTenTrim = hoTen.trim();
  const emailTrim = email.trim();
  const maLopTrim = maLop.trim();

  const maSVRegex = /^SV[0-9]{3}$/;
  if (!maSVRegex.test(maSVTrim)) {
    throw new AppError(400, 'Mã sinh viên phải có dạng SV và 3 chữ số (ví dụ SV003)');
  }

  if (!hoTenTrim || !maLopTrim) {
    throw new AppError(400, 'Họ tên và mã lớp không được để rỗng');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    throw new AppError(400, 'Email không đúng định dạng');
  }

  if (hoTenTrim.length > 150 || emailTrim.length > 254 || maLopTrim.length > 50) {
    throw new AppError(400, 'Dữ liệu vượt quá giới hạn độ dài cột cho phép');
  }

  const existing = await SinhVien.findByPk(maSVTrim);
  if (existing) {
    throw new AppError(409, 'Mã sinh viên đã tồn tại');
  }

  const newSv = await SinhVien.create({
    maSV: maSVTrim,
    hoTen: hoTenTrim,
    email: emailTrim,
    maLop: maLopTrim
  });

  return {
    maSV: newSv.maSV,
    hoTen: newSv.hoTen,
    email: newSv.email,
    maLop: newSv.maLop
  };
};

export const capNhatSinhVien = async (maSV: string, input: unknown): Promise<ISinhVienDTO> => {
  const sv = await SinhVien.findByPk(maSV);
  if (!sv) {
    throw new AppError(404, 'Không tìm thấy sinh viên');
  }

  if (typeof input !== 'object' || input === null) {
    throw new AppError(400, 'Dữ liệu đầu vào không hợp lệ');
  }

  const { hoTen, email, maLop } = input as Record<string, unknown>;

  if (typeof hoTen !== 'string' || typeof email !== 'string' || typeof maLop !== 'string') {
    throw new AppError(400, 'Các trường hoTen, email, maLop phải là chuỗi');
  }

  const hoTenTrim = hoTen.trim();
  const emailTrim = email.trim();
  const maLopTrim = maLop.trim();

  if (!hoTenTrim || !maLopTrim) {
    throw new AppError(400, 'Họ tên và mã lớp không được để rỗng');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    throw new AppError(400, 'Email không đúng định dạng');
  }

  await sv.update({
    hoTen: hoTenTrim,
    email: emailTrim,
    maLop: maLopTrim
  });

  return {
    maSV: sv.maSV,
    hoTen: sv.hoTen,
    email: sv.email,
    maLop: sv.maLop
  };
};

export const xoaSinhVien = async (maSV: string): Promise<void> => {
  const sv = await SinhVien.findByPk(maSV);
  if (!sv) {
    throw new AppError(404, 'Không tìm thấy sinh viên');
  }
  await sv.destroy();
};