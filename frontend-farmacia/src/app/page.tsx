'use client';

import { useRouter } from 'next/navigation';
import { Pill, Building2, Package, BarChart3, Heart } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const cards = [
    {
      title: "Laboratorios",
      description: "Gestiona los laboratorios farmacéuticos",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      route: "/laboratorios",
      stats: "15+ Registrados"
    },
    {
      title: "Medicamentos",
      description: "Administra el inventario de medicamentos",
      icon: Pill,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      route: "/medicamentos",
      stats: "500+ Productos"
    },
    {
      title: "Inventario",
      description: "Control de stock y existencias",
      icon: Package,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      route: "/inventario",
      stats: "En tiempo real"
    },
    {
      title: "Reportes",
      description: "Análisis y estadísticas del sistema",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      route: "/reportes",
      stats: "Datos actualizados"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FarmaSys
              </h1>
              <p className="text-gray-600 text-sm">Sistema de Gestión Farmacéutica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gestión Integral de
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tu Farmacia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Administra laboratorios, medicamentos y inventario con una plataforma moderna, 
            segura y fácil de usar diseñada especialmente para el sector farmacéutico.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                onClick={() => router.push(card.route)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} ${card.hoverColor} p-8 shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-10 w-10 text-white/90" />
                    <div className="text-white/70 text-sm font-medium">
                      {card.stats}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <div className="mt-6 flex items-center text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                    Acceder
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Estadísticas del Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Laboratorios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Medicamentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Precisión</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 FarmaSys. Sistema de Gestión Farmacéutica Avanzado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}