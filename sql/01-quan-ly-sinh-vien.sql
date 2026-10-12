IF DB_ID(N'QuanLySinhVienDB') IS NULL
    CREATE DATABASE QuanLySinhVienDB;
GO

USE QuanLySinhVienDB;
GO

IF OBJECT_ID(N'dbo.SinhVien', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.SinhVien (
        maSV   VARCHAR(5)    NOT NULL PRIMARY KEY,
        hoTen  NVARCHAR(150) NOT NULL,
        email  NVARCHAR(254) NOT NULL,
        maLop  NVARCHAR(50)  NOT NULL
    );
END
GO