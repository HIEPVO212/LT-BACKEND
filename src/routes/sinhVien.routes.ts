import { Router } from 'express';
import {
  getDanhSachSinhVien,
  getSinhVienTheoMa,
  taoSinhVien,
} from '../controllers/sinhVien.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createSinhVienSchema } from '../validations/sinhVien.schema.js';

const router = Router();

router.get('/', getDanhSachSinhVien);
router.get('/:maSV', getSinhVienTheoMa);
router.post('/', validate(createSinhVienSchema), taoSinhVien);

export default router;