'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Save, ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import { createLaboratorio } from '@/lib/api';

export default function NuevoLaboratorio() {
  const router = useRouter();
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.razonSocial || !form.direccion) {
      alert('Por favor completa los campos obligatorios (Razón Social y Dirección)');
      return;
    }

    setLoading(true);
    try {
      await createLaboratorio(form);
      alert('Laboratorio creado exitosamente');
      router.push('/laboratorios');
    } catch (error) {
      console.error('Error al crear laboratorio:', error);
      alert('Error al crear el laboratorio');
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Nuevo Laboratorio
                </h1>
                <p className="text-gray-600 text-sm">Registra un nuevo laboratorio farmacéutico</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Información del Laboratorio</h2>
            <p className="text-green-100 mt-1">Completa todos los datos necesarios</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Razón Social */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <Building2 className="h-5 w-5 text-green-600" />
                <span>Razón Social *</span>
              </label>
              <input
                type="text"
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Laboratorios Bayer S.A."
              />
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>Dirección *</span>
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Av. Javier Prado 123, San Isidro"
              />
            </div>

            {/* Grid para campos opcionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teléfono */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span>Teléfono</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  placeholder="Ej: +51 1 234-5678"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  placeholder="Ej: contacto@laboratorio.com"
                />
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <User className="h-5 w-5 text-green-600" />
                <span>Persona de Contacto</span>
              </label>
              <input
                type="text"
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Ej: Dr. Juan Pérez"
              />
            </div>

            {/* Nota informativa */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 text-sm">
                <strong>Nota:</strong> Los campos marcados con (*) son obligatorios. 
                La información proporcionada será utilizada para la gestión de medicamentos y comunicaciones oficiales.
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
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Guardar Laboratorio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}