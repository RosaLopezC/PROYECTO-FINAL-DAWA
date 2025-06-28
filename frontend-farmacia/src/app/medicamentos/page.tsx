'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, Plus, Edit, Trash2, Calendar, Package, DollarSign, Building2, ArrowLeft } from 'lucide-react';

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMedicamentos = async () => {
    try {
      const res = await fetch('http://3.148.115.134:3002/api/medicamentos');
      const data = await res.json();
      setMedicamentos(data);
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarMedicamento = async (codMedicamento) => {
    if (!confirm('¿Estás seguro de eliminar este medicamento?')) return;

    try {
      const res = await fetch(`http://3.148.115.134:3002/api/medicamentos/${codMedicamento}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Medicamento eliminado correctamente');
        fetchMedicamentos();
      } else {
        alert('Error al eliminar el medicamento');
      }
    } catch (error) {
      console.error('Error al eliminar medicamento:', error);
      alert('Error al eliminar el medicamento');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <Pill className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Medicamentos
                  </h1>
                  <p className="text-gray-600 text-sm">Gestión del inventario farmacéutico</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/medicamentos/new')}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Nuevo Medicamento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {medicamentos.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 max-w-md mx-auto">
              <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay medicamentos registrados</h3>
              <p className="text-gray-600 mb-6">Comienza agregando tu primer medicamento al inventario.</p>
              <button
                onClick={() => router.push('/medicamentos/new')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5 inline mr-2" />
                Agregar Medicamento
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {medicamentos.map((med) => (
              <div
                key={med.codMedicamento}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Pill className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold line-clamp-2">{med.descripcionMed}</h3>
                        <p className="text-green-100 text-sm">#{med.codMedicamento}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/medicamentos/${med.codMedicamento}/edit`)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => eliminarMedicamento(med.codMedicamento)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Laboratorio */}
                  <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-blue-900 font-medium text-sm">Laboratorio</p>
                      <p className="text-blue-700 text-sm">{med.laboratorio?.razonSocial}</p>
                    </div>
                  </div>

                  {/* Presentación y Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600 text-xs">Presentación</p>
                        <p className="text-gray-900 font-medium text-sm">{med.presentacion}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600 text-xs">Stock</p>
                        <p className={`font-bold text-sm ${med.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                          {med.stock} unidades
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Precios */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-green-700 text-xs">Precio Unitario</p>
                          <p className="text-green-900 font-bold">S/ {med.precioVentaUni}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-green-700 text-xs">Precio Presentación</p>
                          <p className="text-green-900 font-bold">S/ {med.precioVentaPres}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600 text-xs">Fabricación</p>
                        <p className="text-gray-900 text-sm">{formatDate(med.fechaFabricacion)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <div>
                        <p className="text-gray-600 text-xs">Vencimiento</p>
                        <p className={`text-sm font-medium ${
                          new Date(med.fechaVencimiento) < new Date(Date.now() + 30*24*60*60*1000) 
                            ? 'text-red-600' 
                            : 'text-gray-900'
                        }`}>
                          {formatDate(med.fechaVencimiento)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      med.stock < 20 
                        ? 'bg-red-100 text-red-800' 
                        : med.stock < 50 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {med.stock < 20 ? 'Stock Bajo' : med.stock < 50 ? 'Stock Medio' : 'Stock Alto'}
                    </span>
                    <button
                      onClick={() => router.push(`/medicamentos/${med.codMedicamento}/edit`)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline transition-colors"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}