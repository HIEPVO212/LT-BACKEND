# Nhật Ký Prompt & Giải Thích Tích Hợp (Chương 05)

## 1. Nhật ký Prompt & Quá trình thực hiện
- **Yêu cầu:** Triển khai Zod Validation Middleware cho Endpoint POST Sinh Viên và tích hợp Morgan Access Logging.
- **Tiến trình:**
  1. Xây dựng Zod Schema `src/validations/sinhVien.schema.ts` validate dữ liệu đầu vào (mã SV, họ tên, email, mã lớp).
  2. Tạo Middleware `src/middlewares/validate.middleware.ts` bắt lỗi HTTP 400 chuẩn hóa định dạng JSON khi dữ liệu không hợp lệ.
  3. Xây dựng Middleware `src/middlewares/access-log.middleware.ts` dùng Morgan ghi nhật ký truy cập vào `logs/access.log`.
  4. Cập nhật `src/routes/sinhVien.routes.ts` gắn middleware validation vào router POST.
  5. Khởi chạy server thành công tại cổng 5001, test giao diện Swagger UI và kiểm tra file log hoạt động chính xác.

## 2. Giải thích cơ chế Middleware & Validation
- **Middleware trong Express:** Là các hàm xử lý trung gian nằm giữa request gửi lên và controller xử lý cuối cùng.
- **Vai trò của `next()`:** Cho phép request tiếp tục chuyển sang middleware hoặc controller tiếp theo trong chuỗi xử lý. Nếu dữ liệu gửi lên sai quy cách, middleware sẽ gửi phản hồi lỗi (400) về client ngay lập tức và **không** gọi `next()`.
- **Zod Validation:** Kiểm tra cấu trúc, kiểu dữ liệu và định dạng (email, rỗng) của body request trước khi đi vào logic nghiệp vụ.
- **Morgan Logging:** Tự động bắt thông tin request (HTTP method, URL, status code, thời gian phản hồi) và ghi vào file `logs/access.log` để phục vụ công tác giám sát và kiểm vết hệ thống.