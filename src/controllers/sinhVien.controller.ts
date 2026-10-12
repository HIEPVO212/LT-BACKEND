import type { Request, Response, NextFunction } from 'express';
import {
  layDanhSachSinhVien,
  timSinhVienTheoMa,
  themSinhVien,
  capNhatSinhVien,
  xoaSinhVien
} from '../services/sinhVien.service.js';

export const getDanhSachSinhVien = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await layDanhSachSinhVien();
    res.status(200).json({
      success: true,
      message: 'Lấy danh sách sinh viên thành công',
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getSinhVienTheoMa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const maSV = req.params.maSV as string;
    const data = await timSinhVienTheoMa(maSV);
    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên',
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Tìm sinh viên thành công',
      data
    });
  } catch (error) {
    next(error);
  }
};

export const taoSinhVien = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await themSinhVien(req.body);
    res.status(201).json({
      success: true,
      message: 'Thêm sinh viên thành công',
      data
    });
  } catch (error) {
    next(error);
  }
};

export const capNhatSinhVienHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const maSV = req.params.maSV as string;
    const data = await capNhatSinhVien(maSV, req.body);
    res.status(200).json({
      success: true,
      message: 'Cập nhật sinh viên thành công',
      data
    });
  } catch (error) {
    next(error);
  }
};

export const xoaSinhVienHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const maSV = req.params.maSV as string;
    await xoaSinhVien(maSV);
    res.status(200).json({
      success: true,
      message: 'Xóa sinh viên thành công'
    });
  } catch (error) {
    next(error);
  }
};