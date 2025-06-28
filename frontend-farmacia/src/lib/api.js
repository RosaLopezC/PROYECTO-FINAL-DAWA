const BASE_URL = 'http://3.148.115.134:3002/api';

// API Laboratorios
export async function getLaboratorios() {
  const res = await fetch(`${BASE_URL}/laboratorios`);
  return res.json();
}

export async function getLaboratorio(id) {
  const res = await fetch(`${BASE_URL}/laboratorios/${id}`);
  return res.json();
}

export async function createLaboratorio(laboratorio) {
  const res = await fetch(`${BASE_URL}/laboratorios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(laboratorio)
  });
  return res.json();
}

export async function updateLaboratorio(id, laboratorio) {
  const res = await fetch(`${BASE_URL}/laboratorios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(laboratorio)
  });
  return res.json();
}

export async function deleteLaboratorio(id) {
  await fetch(`${BASE_URL}/laboratorios/${id}`, {
    method: 'DELETE'
  });
}

// API Medicamentos
export async function getMedicamentos() {
  const res = await fetch(`${BASE_URL}/medicamentos`);
  return res.json();
}

export async function getMedicamento(id) {
  const res = await fetch(`${BASE_URL}/medicamentos/${id}`);
  return res.json();
}

export async function createMedicamento(medicamento) {
  const res = await fetch(`${BASE_URL}/medicamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento)
  });
  return res.json();
}

export async function updateMedicamento(id, medicamento) {
  const res = await fetch(`${BASE_URL}/medicamentos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento)
  });
  return res.json();
}

export async function deleteMedicamento(id) {
  await fetch(`${BASE_URL}/medicamentos/${id}`, {
    method: 'DELETE'
  });
}