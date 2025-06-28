#!/bin/bash
echo "🚀 Iniciando FarmaSys con Docker..."

# Construir imágenes
echo "📦 Construyendo imágenes..."
docker-compose build

# Iniciar servicios
echo "🔄 Iniciando servicios..."
docker-compose up -d

# Mostrar estado
echo "📊 Estado de contenedores:"
docker-compose ps

echo "✅ FarmaSys iniciado correctamente!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:3002"
echo "🗄️ MySQL: localhost:3307"