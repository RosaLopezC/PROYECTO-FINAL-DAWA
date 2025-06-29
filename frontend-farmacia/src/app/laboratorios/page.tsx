'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, Plus, Edit2, Trash2, Mail, Phone, MapPin, User, ChevronLeft } from 'lucide-react';

export default function LaboratoriosPage() {
  // [Mantengo exactamente la misma lógica de estado y funciones]
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse mx-auto"></div>
            <FlaskConical className="h-8 w-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-rose-600 font-medium">Cargando laboratorios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header minimalista */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
              Directorio de Laboratorios
            </h1>
            <p className="text-xs text-pink-500">Gestión farmacéutica especializada</p>
          </div>
          
          <button
            onClick={() => router.push('/laboratorios/new')}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-rose-300/50 transition-all"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contenido principal con diseño alternativo */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {laboratorios.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-pink-200 shadow-sm mb-6">
              <FlaskConical className="h-12 w-12 text-pink-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-pink-800 mb-2">No hay laboratorios registrados</h3>
            <p className="text-pink-600 mb-6">Comienza agregando tu primer proveedor farmacéutico</p>
            <button
              onClick={() => router.push('/laboratorios/new')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5 inline mr-2 -mt-1" />
              Nuevo Laboratorio
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Listado en formato tarjeta horizontal */}
            {laboratorios.map((lab) => (
              <div 
                key={lab.codLab}
                className="relative group bg-white rounded-2xl shadow-sm hover:shadow-md border border-pink-100 overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-pink-400 to-rose-400"></div>
                
                <div className="pl-6 pr-4 py-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                          <FlaskConical className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-pink-900 truncate">{lab.razonSocial}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-12">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-pink-400 flex-shrink-0" />
                          <p className="text-sm text-pink-700 truncate">{lab.direccion}</p>
                        </div>
                        
                        {lab.telefono && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-pink-400 flex-shrink-0" />
                            <p className="text-sm text-pink-700">{lab.telefono}</p>
                          </div>
                        )}
                        
                        {lab.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-pink-400 flex-shrink-0" />
                            <p className="text-sm text-pink-700 truncate">{lab.email}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => router.push(`/laboratorios/${lab.codLab}/edit`)}
                        className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => eliminarLaboratorio(lab.codLab)}
                        className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {lab.contacto && (
                    <div className="mt-4 ml-12 flex items-center space-x-2">
                      <User className="h-4 w-4 text-pink-400 flex-shrink-0" />
                      <p className="text-sm text-pink-700 font-medium">Contacto: {lab.contacto}</p>
                    </div>
                  )}
                </div>
                
                <div className="px-6 py-3 bg-pink-50 border-t border-pink-100 flex justify-between items-center">
                  <span className="text-xs font-mono text-pink-500">ID: {lab.codLab}</span>
                  <button
                    onClick={() => router.push(`/laboratorios/${lab.codLab}/edit`)}
                    className="text-xs font-medium text-pink-600 hover:text-pink-700 hover:underline"
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