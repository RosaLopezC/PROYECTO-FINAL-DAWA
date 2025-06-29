'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Building2, Save, ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import { getLaboratorio, updateLaboratorio } from '@/lib/api';

export default function EditarLaboratorio() {
  // [Toda la lógica se mantiene igual]
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
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-rose-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-400 to-rose-400 animate-pulse mx-auto"></div>
            <Building2 className="h-8 w-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-rose-600 font-medium">Cargando laboratorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-rose-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/laboratorios')}
            className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-rose-600">
              Editar Laboratorio
            </h1>
            <p className="text-xs text-rose-500">Actualiza la información del proveedor</p>
          </div>
          
          <div className="w-10"></div> {/* Espacio para mantener la alineación */}
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden">
          {/* Encabezado del formulario */}
          <div className="bg-gradient-to-r from-fuchsia-500 to-rose-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Información del Laboratorio</h2>
            <p className="text-rose-100 mt-1">Actualiza los datos del proveedor farmacéutico</p>
          </div>

          {/* Cuerpo del formulario */}
          <div className="p-8 space-y-6">
            {/* Razón Social */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-800 font-semibold">
                <Building2 className="h-5 w-5 text-rose-500" />
                <span>Razón Social *</span>
              </label>
              <input
                type="text"
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                placeholder="Ej: Laboratorios Bayer S.A."
              />
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-800 font-semibold">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>Dirección *</span>
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                placeholder="Ej: Av. Javier Prado 123, San Isidro"
              />
            </div>

            {/* Grid para campos opcionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teléfono */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-800 font-semibold">
                  <Phone className="h-5 w-5 text-rose-500" />
                  <span>Teléfono</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                  placeholder="Ej: +51 1 234-5678"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-800 font-semibold">
                  <Mail className="h-5 w-5 text-rose-500" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                  placeholder="Ej: contacto@laboratorio.com"
                />
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-800 font-semibold">
                <User className="h-5 w-5 text-rose-500" />
                <span>Persona de Contacto</span>
              </label>
              <input
                type="text"
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                placeholder="Ej: Dr. Juan Pérez"
              />
            </div>

            {/* Nota informativa */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <p className="text-rose-800 text-sm">
                <strong>Nota:</strong> Los campos marcados con (*) son obligatorios. 
                Los cambios se aplicarán inmediatamente en el sistema.
              </p>
            </div>
          </div>

          {/* Footer del formulario */}
          <div className="bg-rose-50/80 px-8 py-6 border-t border-rose-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/laboratorios')}
              className="px-6 py-3 border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-600 hover:to-rose-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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