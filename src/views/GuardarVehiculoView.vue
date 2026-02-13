<template>
  <div class="guardar-view">
    <div class="row">
      <div class="col-component content-col">
        <FormularioVehiculo @vehiculo-guardado="agregarVehiculo" />
      </div>
    </div>

    <div class="row">
      <div class="col-component content-col">
        <ListaVehiculos :vehiculos="vehiculos" @eliminar-vehiculo="eliminarVehiculo" />
      </div>
    </div>
  </div>
</template>

<script>
import FormularioVehiculo from '@/components/FormularioVehiculo.vue';
import ListaVehiculos from '@/components/ListaVehiculos.vue';
import ApiClient from '@/clients/ApiClient';

export default {
  components: {
    FormularioVehiculo,
    ListaVehiculos
  },
  data() {
    return {
      vehiculos: []
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.cargarVehiculos();
    }
  },
  methods: {
    async cargarVehiculos() {
      try {
        const response = await ApiClient.getAllVehiculos();
        this.vehiculos = response.data;
      } catch (error) {
        console.error("Error al cargar vehiculos", error);
      }
    },
    agregarVehiculo(nuevoVehiculo) {
      this.vehiculos.push(nuevoVehiculo);
    },
    eliminarVehiculo(id) {
      // elimina localmente; se puede expandir para llamar al backend
      this.vehiculos = this.vehiculos.filter(v => v.id !== id);
    }
  }
}
</script>

<style scoped>

.guardar-view {
  padding: 20px;
}


.row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}



.label-col {
  width: 150px;
  text-align: right;
  padding-right: 20px;
  color: #3498db;
  font-style: italic;
  font-size: 1.2rem;
}



.content-col {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
</style>
