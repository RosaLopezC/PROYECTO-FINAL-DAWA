# PROYECTO-DAWA

Este repositorio contiene el código fuente de una aplicación de farmacia, organizada en dos partes principales: backend y frontend.

## Estructura del proyecto

```
PROYECTO-DAWA/
│
├── backend-farmacia/   # API REST con Node.js y Sequelize
├── frontend-farmacia/  # Aplicación web (React, Vite, etc.)
├── scripts/            # Scripts útiles para desarrollo y despliegue
├── nginx/              # Configuración de Nginx (opcional)
├── init.sql            # Script para inicializar la base de datos
└── README.md
```

---

## Requisitos previos

- Node.js 18+
- npm 9+
- MySQL 5.7/8+ (local o en la nube)
- (Opcional) Docker y Docker Compose para desarrollo local

---

## Instalación y uso local

### 1. Clona el repositorio

```sh
git clone https://github.com/RosaLopezC/PROYECTO-FINAL-DAWA.git
cd PROYECTO-DAWA
```

### 2. Configura la base de datos

- Crea una base de datos MySQL y un usuario.
- Ejecuta el script `init.sql` para crear las tablas necesarias.

### 3. Backend

```sh
cd backend-farmacia
cp .env.production .env
npm install
node index.js
```

### 4. Frontend

```sh
cd frontend-farmacia
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Despliegue en Vercel

Para desplegar solo el frontend:

1. Sube el contenido de la carpeta `frontend-farmacia` a un nuevo repositorio o conecta tu repo a Vercel.
2. En la configuración de Vercel, selecciona `frontend-farmacia` como directorio raíz.
3. Configura las variables de entorno necesarias para que el frontend apunte al backend correcto.

> **Nota:** El backend debe estar desplegado en un servicio compatible (Railway, Render, etc.) y accesible desde el frontend.

---

## Docker (opcional)

Para desarrollo local puedes usar Docker Compose para levantar backend, frontend y base de datos fácilmente.

```sh
docker compose up --build
```

---

## Créditos

Desarrollado y adaptado por [RosaLopezC].

---

## Licencia

Este proyecto es de uso académico y puede ser utilizado como base para proyectos personales o profesionales, respetando siempre las licencias de las tecnologías utilizadas y los datos de los pacientes.