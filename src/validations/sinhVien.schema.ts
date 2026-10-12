import { z } from 'zod';

const editableFields = {
  hoTen: z.string().trim().min(1, 'Họ tên không được rỗng'),
  email: z.string().trim().email('Email không hợp lệ'),
  maLop: z.string().trim().min(1, 'Mã lớp không được rỗng'),
};

export const createSinhVienSchema = z.object({
  maSV: z.string().trim().min(1, 'Mã SV không được rỗng'),
  ...editableFields,
}).strict();

export const updateSinhVienSchema = z.object({
  ...editableFields,
}).strict();