'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Building2, Save, ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import { getLaboratorio, updateLaboratorio } from '@/lib/api';

export default function EditarLaboratorio() {
  const router = useRouter();
  const { codLab } = useParams();
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchLaboratorio();
  }, [codLab]);

  const fetchLaboratorio = async () => {
    try {
      const data = await getLaboratorio(codLab);
      setForm({
        razonSocial: data.razonSocial || '',
        direccion: data.direccion || '',
        telefono: data.telefono || '',
        email: data.email || '',
        contacto: data.contacto || ''
      });
    } catch (error) {
      console.error('Error al cargar laboratorio:', error);
      alert('Error al cargar los datos del laboratorio');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.razonSocial || !form.direccion) {
      alert('Por favor completa los campos obligatorios (Razón Social y Dirección)');
      return;
    }

    setLoading(true);
    try {
      await updateLaboratorio(codLab, form);
      alert('Laboratorio actualizado exitosamente');
      router.push('/laboratorios');
    } catch (error) {
      console.error('Error al actualizar laboratorio:', error);
      alert('Error al actualizar el laboratorio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando laboratorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/laboratorios')}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Editar Laboratorio
                </h1>
                <p className="text-gray-600 text-sm">Actualiza la información del laboratorio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Actualizar Información</h2>
            <p className="text-blue-100 mt-1">Modifica los datos del laboratorio</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Razón Social */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span>Razón Social *</span>
              </label>
              <input
                type="text"
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Laboratorios Bayer S.A."
              />
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Dirección *</span>
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Av. Javier Prado 123, San Isidro"
              />
            </div>

            {/* Grid para campos opcionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teléfono */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>Teléfono</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  placeholder="Ej: +51 1 234-5678"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  placeholder="Ej: contacto@laboratorio.com"
                />
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <User className="h-5 w-5 text-blue-600" />
                <span>Persona de Contacto</span>
              </label>
              <input
                type="text"
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Dr. Juan Pérez"
              />
            </div>

            {/* Nota informativa */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>Nota:</strong> Los campos marcados con (*) son obligatorios. 
                Los cambios se aplicarán inmediatamente en el sistema.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50/80 px-8 py-6 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/laboratorios')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Actualizando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Actualizar Laboratorio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}