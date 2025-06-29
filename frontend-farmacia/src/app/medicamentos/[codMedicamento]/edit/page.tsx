'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Pill, Save, ArrowLeft, Calendar, Package, DollarSign, Building2, FileText } from 'lucide-react';
import { getMedicamento, updateMedicamento, getLaboratorios } from '@/lib/api';

export default function EditarMedicamento() {
  // [Toda la lógica se mantiene exactamente igual]
  const router = useRouter();
  const { codMedicamento } = useParams();
  const [laboratorios, setLaboratorios] = useState([]);
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    presentacion: '',
    stock: '',
    precioVentaUni: '',
    precioVentaPres: '',
    codLab: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchData();
  }, [codMedicamento]);

  const fetchData = async () => {
    try {
      const [medicamentoData, laboratoriosData] = await Promise.all([
        getMedicamento(codMedicamento),
        getLaboratorios()
      ]);
      
      setLaboratorios(laboratoriosData);
      
      const fechaFab = new Date(medicamentoData.fechaFabricacion).toISOString().split('T')[0];
      const fechaVenc = new Date(medicamentoData.fechaVencimiento).toISOString().split('T')[0];
      
      setForm({
        descripcionMed: medicamentoData.descripcionMed,
        fechaFabricacion: fechaFab,
        fechaVencimiento: fechaVenc,
        presentacion: medicamentoData.presentacion,
        stock: medicamentoData.stock.toString(),
        precioVentaUni: medicamentoData.precioVentaUni.toString(),
        precioVentaPres: medicamentoData.precioVentaPres.toString(),
        codLab: medicamentoData.codLab.toString()
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos del medicamento');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.descripcionMed || !form.fechaFabricacion || !form.fechaVencimiento || 
        !form.presentacion || !form.stock || !form.precioVentaUni || 
        !form.precioVentaPres || !form.codLab) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const fechaFab = new Date(form.fechaFabricacion);
    const fechaVenc = new Date(form.fechaVencimiento);
    if (fechaVenc <= fechaFab) {
      alert('La fecha de vencimiento debe ser posterior a la fecha de fabricación');
      return;
    }

    setLoading(true);
    try {
      const medicamentoData = {
        ...form,
        stock: parseInt(form.stock),
        precioVentaUni: parseFloat(form.precioVentaUni),
        precioVentaPres: parseFloat(form.precioVentaPres),
        codLab: parseInt(form.codLab)
      };
      
      await updateMedicamento(codMedicamento, medicamentoData);
      alert('Medicamento actualizado exitosamente');
      router.push('/medicamentos');
    } catch (error) {
      console.error('Error al actualizar medicamento:', error);
      alert('Error al actualizar el medicamento');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando medicamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/medicamentos')}
              className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-rose-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg">
                <Pill className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Editar Medicamento
                </h1>
                <p className="text-rose-600 text-sm">Actualiza la información del medicamento</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Actualizar Información</h2>
            <p className="text-pink-100 mt-1">Modifica los datos del medicamento</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Información Básica */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-rose-900 border-b border-pink-200 pb-2">
                Información Básica
              </h3>
              
              {/* Descripción */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                  <FileText className="h-5 w-5 text-pink-600" />
                  <span>Descripción del Medicamento *</span>
                </label>
                <input
                  type="text"
                  name="descripcionMed"
                  value={form.descripcionMed}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                  placeholder="Ej: Paracetamol 500mg"
                />
              </div>

              {/* Laboratorio */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                  <Building2 className="h-5 w-5 text-pink-600" />
                  <span>Laboratorio *</span>
                </label>
                <select
                  name="codLab"
                  value={form.codLab}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                >
                  <option value="">Selecciona un laboratorio</option>
                  {laboratorios.map((lab) => (
                    <option key={lab.codLab} value={lab.codLab}>
                      {lab.razonSocial}
                    </option>
                  ))}
                </select>
              </div>

              {/* Presentación */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                  <Package className="h-5 w-5 text-pink-600" />
                  <span>Presentación *</span>
                </label>
                <select
                  name="presentacion"
                  value={form.presentacion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                >
                  <option value="">Selecciona una presentación</option>
                  <option value="Tabletas">Tabletas</option>
                  <option value="Cápsulas">Cápsulas</option>
                  <option value="Jarabe">Jarabe</option>
                  <option value="Suspensión">Suspensión</option>
                  <option value="Inyectable">Inyectable</option>
                  <option value="Gotas">Gotas</option>
                  <option value="Crema">Crema</option>
                  <option value="Gel">Gel</option>
                  <option value="Ungüento">Ungüento</option>
                </select>
              </div>
            </div>

            {/* Fechas */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-rose-900 border-b border-pink-200 pb-2">
                Fechas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fecha de Fabricación */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                    <Calendar className="h-5 w-5 text-pink-600" />
                    <span>Fecha de Fabricación *</span>
                  </label>
                  <input
                    type="date"
                    name="fechaFabricacion"
                    value={form.fechaFabricacion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                  />
                </div>

                {/* Fecha de Vencimiento */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                    <Calendar className="h-5 w-5 text-rose-600" />
                    <span>Fecha de Vencimiento *</span>
                  </label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={form.fechaVencimiento}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                  />
                </div>
              </div>
            </div>

            {/* Inventario y Precios */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-rose-900 border-b border-pink-200 pb-2">
                Inventario y Precios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stock */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                    <Package className="h-5 w-5 text-pink-600" />
                    <span>Stock Actual *</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                    placeholder="100"
                  />
                </div>

                {/* Precio Unitario */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                    <DollarSign className="h-5 w-5 text-pink-600" />
                    <span>Precio Unitario (S/) *</span>
                  </label>
                  <input
                    type="number"
                    name="precioVentaUni"
                    value={form.precioVentaUni}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                    placeholder="2.50"
                  />
                </div>

                {/* Precio Presentación */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-rose-700 font-semibold">
                    <DollarSign className="h-5 w-5 text-rose-600" />
                    <span>Precio Presentación (S/) *</span>
                  </label>
                  <input
                    type="number"
                    name="precioVentaPres"
                    value={form.precioVentaPres}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/80 text-rose-900"
                    placeholder="25.00"
                  />
                </div>
              </div>
            </div>

            {/* Nota informativa */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
              <p className="text-pink-800 text-sm">
                <strong>Nota:</strong> Verifica que todos los datos sean correctos antes de guardar. 
                Los cambios en precios y stock afectarán inmediatamente el sistema de inventario.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-rose-50/80 px-8 py-6 border-t border-pink-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/medicamentos')}
              className="px-6 py-3 border border-pink-300 text-rose-700 rounded-xl hover:bg-pink-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Actualizando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Actualizar Medicamento</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}