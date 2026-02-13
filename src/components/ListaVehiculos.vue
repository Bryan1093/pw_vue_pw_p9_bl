<template>
  <div class="lista-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Chasis</th>
          <th>Fecha de fabricación</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in vehiculos" :key="v.id">
          <td>{{ v.id }}</td>
          <td>{{ v.marca }}</td>
          <td>{{ v.modelo }}</td>
          <td>{{ v.chasis }}</td>
          <td>{{ formatDate(v.fabricacion) }}</td>
          <td>
            <button @click="$emit('eliminar-vehiculo', v.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="vehiculos.length === 0">
          <td colspan="6">No hay vehículos guardados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    vehiculos: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const d = new Date(dateString);
      if (isNaN(d)) return dateString;
      return d.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.lista-container {
  border: 1px dashed #34495e;
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  color: #3498db;
  font-weight: bold;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c0392b;
}
</style>
