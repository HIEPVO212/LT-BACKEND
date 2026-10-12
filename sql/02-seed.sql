USE QuanLySinhVienDB;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.SinhVien WHERE maSV = 'SV001')
    INSERT INTO dbo.SinhVien (maSV, hoTen, email, maLop)
    VALUES ('SV001', N'Minh Nhật', N'minhnhat@example.com', N'25CT114');

IF NOT EXISTS (SELECT 1 FROM dbo.SinhVien WHERE maSV = 'SV002')
    INSERT INTO dbo.SinhVien (maSV, hoTen, email, maLop)
    VALUES ('SV002', N'Lan Anh', N'lananh@example.com', N'25CT114');
GO

SELECT maSV, hoTen, email, maLop FROM dbo.SinhVien ORDER BY maSV;
GO