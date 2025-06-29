'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, Plus, Edit2, Trash2, Calendar, Package, DollarSign, FlaskConical, ChevronLeft } from 'lucide-react';

export default function MedicamentosPage() {
  // [Toda la lógica se mantiene igual]
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
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-rose-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-400 to-rose-400 animate-pulse mx-auto"></div>
            <Pill className="h-8 w-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-rose-600 font-medium">Cargando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-rose-50">
      {/* Header idéntico al diseño aprobado */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-rose-600">
              Inventario de Medicamentos
            </h1>
            <p className="text-xs text-rose-500">Control farmacéutico especializado</p>
          </div>
          
          <button
            onClick={() => router.push('/medicamentos/new')}
            className="p-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-lg hover:shadow-rose-300/50 transition-all"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contenido con la misma estructura que el diseño aprobado */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {medicamentos.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-rose-200 shadow-sm mb-6">
              <Pill className="h-12 w-12 text-rose-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-2">No hay medicamentos registrados</h3>
            <p className="text-rose-600 mb-6">Comienza agregando tu primer producto farmacéutico</p>
            <button
              onClick={() => router.push('/medicamentos/new')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5 inline mr-2 -mt-1" />
              Nuevo Medicamento
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {medicamentos.map((med) => (
              <div 
                key={med.codMedicamento}
                className="relative group bg-white rounded-2xl shadow-sm hover:shadow-md border border-rose-100 overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-pink-400 to-rose-400"></div>
                
                <div className="pl-6 pr-4 py-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                          <Pill className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-rose-900 truncate">{med.descripcionMed}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-12">
                        <div className="flex items-center space-x-2">
                          <FlaskConical className="h-4 w-4 text-rose-400" />
                          <div>
                            <p className="text-xs text-rose-600">Laboratorio</p>
                            <p className="text-sm text-rose-800">{med.laboratorio?.razonSocial}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-rose-400" />
                          <div>
                            <p className="text-xs text-rose-600">Presentación</p>
                            <p className="text-sm text-rose-800">{med.presentacion}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className={`h-3 w-3 rounded-full ${
                            med.stock < 20 ? 'bg-red-500' : med.stock < 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="text-xs text-rose-600">Stock</p>
                            <p className="text-sm text-rose-800">{med.stock} unidades</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3 ml-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/medicamentos/${med.codMedicamento}/edit`)}
                          className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => eliminarMedicamento(med.codMedicamento)}
                          className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-rose-600">Precio unitario</p>
                        <p className="text-lg font-bold text-rose-600">S/ {med.precioVentaUni}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 ml-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-rose-400" />
                      <div>
                        <p className="text-xs text-rose-600">Fabricación</p>
                        <p className="text-sm text-rose-800">{formatDate(med.fechaFabricacion)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-rose-400" />
                      <div>
                        <p className="text-xs text-rose-600">Vencimiento</p>
                        <p className={`text-sm font-medium ${
                          new Date(med.fechaVencimiento) < new Date(Date.now() + 30*24*60*60*1000) 
                            ? 'text-red-600' 
                            : 'text-rose-800'
                        }`}>
                          {formatDate(med.fechaVencimiento)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-rose-50 border-t border-rose-100 flex justify-between items-center">
                  <span className="text-xs font-mono text-rose-500">ID: {med.codMedicamento}</span>
                  <button
                    onClick={() => router.push(`/medicamentos/${med.codMedicamento}/edit`)}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    Ver detalles completos →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}