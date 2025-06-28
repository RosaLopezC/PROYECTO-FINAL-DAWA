-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS bd_farmacia;
USE bd_farmacia;

-- Dar permisos al usuario
GRANT ALL PRIVILEGES ON bd_farmacia.* TO 'farmacia_user'@'%';
FLUSH PRIVILEGES;