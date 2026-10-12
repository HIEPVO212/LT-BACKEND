USE master;
GO
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = N'sv_app')
    CREATE LOGIN sv_app WITH PASSWORD = N'SvApp@12345', CHECK_POLICY = OFF;
GO

USE QuanLySinhVienDB;
GO
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'sv_app')
    CREATE USER sv_app FOR LOGIN sv_app;
GO
GRANT SELECT, INSERT ON dbo.SinhVien TO sv_app;
GO