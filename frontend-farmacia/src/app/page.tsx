'use client';

import { useRouter } from 'next/navigation';
import { FlaskConical, Pill, ClipboardList, LineChart, Leaf } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const cards = [
    {
      title: "Laboratorios Clínicos",
      description: "Control completo de proveedores farmacéuticos",
      icon: FlaskConical,
      color: "from-rose-500 to-pink-600",
      hoverColor: "hover:from-rose-600 hover:to-pink-700",
      route: "/laboratorios",
      stats: "15+ Proveedores"
    },
    {
      title: "Dispensario",
      description: "Gestión de medicamentos y fórmulas",
      icon: Pill,
      color: "from-lime-500 to-green-500",
      hoverColor: "hover:from-lime-600 hover:to-green-600",
      route: "/medicamentos",
      stats: "500+ Fármacos"
    },
    {
      title: "Control de Stock",
      description: "Seguimiento de caducidades y lotes",
      icon: ClipboardList,
      color: "from-amber-500 to-yellow-500",
      hoverColor: "hover:from-amber-600 hover:to-yellow-600",
      route: "/inventario",
      stats: "Alertas activas"
    },
    {
      title: "Indicadores Clínicos",
      description: "Métricas de ventas y prescripciones",
      icon: LineChart,
      color: "from-indigo-500 to-violet-500",
      hoverColor: "hover:from-indigo-600 hover:to-violet-600",
      route: "/reportes",
      stats: "Datos en tiempo real"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg shadow">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                PharmaTrack
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
            Control Avanzado para
            <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Farmacias Contemporáneas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Herramientas especializadas para la administración farmacéutica con seguimiento 
            inteligente de medicamentos y análisis predictivos.
          </p>
        </div>

        {/* Cards Grid - Now in 2 rows of 2 cards */}
        <div className="flex flex-col items-center space-y-8 mb-16">
          {/* First row */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-4xl">
            {cards.slice(0, 2).map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  onClick={() => router.push(card.route)}
                  className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg w-full`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} shadow-inner`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-gray-500 text-sm font-medium">
                        {card.stats}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center text-pink-600 text-sm font-medium group-hover:text-pink-700 transition-colors">
                      Acceder al módulo
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Second row */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-4xl">
            {cards.slice(2, 4).map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index+2}
                  onClick={() => router.push(card.route)}
                  className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg w-full`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} shadow-inner`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-gray-500 text-sm font-medium">
                        {card.stats}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center text-pink-600 text-sm font-medium group-hover:text-pink-700 transition-colors">
                      Acceder al módulo
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Estadísticas Clave
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-500 mb-2">15+</div>
              <div className="text-gray-600">Proveedores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-500 mb-2">500+</div>
              <div className="text-gray-600">Medicamentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-600">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-2">99.9%</div>
              <div className="text-gray-600">Precisión</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2025 PharmaTrack. Plataforma de Gestión Farmacológica.</p>
          </div>
        </div>
      </div>
    </div>
  );
}