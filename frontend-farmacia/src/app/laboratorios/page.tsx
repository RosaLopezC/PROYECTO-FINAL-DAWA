'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Plus, Edit, Trash2, Mail, Phone, MapPin, User, ArrowLeft } from 'lucide-react';

export default function LaboratoriosPage() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchLaboratorios = async () => {
    try {
      const res = await fetch('http://3.148.115.134:3002/api/laboratorios');
      const data = await res.json();
      setLaboratorios(data);
    } catch (error) {
      console.error('Error al obtener laboratorios:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarLaboratorio = async (codLab) => {
    if (!confirm('¿Estás seguro de eliminar este laboratorio?')) return;

    try {
      const res = await fetch(`http://3.148.115.134:3002/api/laboratorios/${codLab}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Laboratorio eliminado correctamente');
        fetchLaboratorios();
      } else {
        alert('Error al eliminar el laboratorio');
      }
    } catch (error) {
      console.error('Error al eliminar laboratorio:', error);
      alert('Error al eliminar el laboratorio');
    }
  };

  useEffect(() => {
    fetchLaboratorios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando laboratorios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Laboratorios
                  </h1>
                  <p className="text-gray-600 text-sm">Gestión de laboratorios farmacéuticos</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/laboratorios/new')}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Nuevo Laboratorio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {laboratorios.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 max-w-md mx-auto">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay laboratorios registrados</h3>
              <p className="text-gray-600 mb-6">Comienza agregando tu primer laboratorio farmacéutico.</p>
              <button
                onClick={() => router.push('/laboratorios/new')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5 inline mr-2" />
                Agregar Laboratorio
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laboratorios.map((lab) => (
              <div
                key={lab.codLab}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{lab.razonSocial}</h3>
                        <p className="text-blue-100 text-sm">Lab #{lab.codLab}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/laboratorios/${lab.codLab}/edit`)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => eliminarLaboratorio(lab.codLab)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-medium">Dirección</p>
                      <p className="text-gray-600 text-sm">{lab.direccion}</p>
                    </div>
                  </div>

                  {lab.telefono && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">Teléfono</p>
                        <p className="text-gray-600 text-sm">{lab.telefono}</p>
                      </div>
                    </div>
                  )}

                  {lab.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">Email</p>
                        <p className="text-gray-600 text-sm">{lab.email}</p>
                      </div>
                    </div>
                  )}

                  {lab.contacto && (
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">Contacto</p>
                        <p className="text-gray-600 text-sm">{lab.contacto}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Código: {lab.codLab}
                    </span>
                    <button
                      onClick={() => router.push(`/laboratorios/${lab.codLab}/edit`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
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