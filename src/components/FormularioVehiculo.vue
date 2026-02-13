<template>
  <div class="formulario-container">
    <h3 class="title">VEHICULO</h3>

    <div class="form-group">
      <label for="token">Token</label>
      <textarea id="token" v-model="token" class="form-input token-area"></textarea>
    </div>

    <div class="form-group">
      <label for="marca">Marca</label>
      <input type="text" id="marca" v-model="vehiculo.marca" class="form-input" />
    </div>

    <div class="form-group">
      <label for="modelo">Modelo</label>
      <input type="text" id="modelo" v-model="vehiculo.modelo" class="form-input" />
    </div>

    <div class="form-group">
      <label for="chasis">Chasis</label>
      <input type="text" id="chasis" v-model="vehiculo.chasis" class="form-input" />
    </div>

    <div class="form-group">
      <label for="fabricacion">Fecha de fabricacion</label>
      <input type="date" id="fabricacion" v-model="vehiculo.fabricacion" class="form-input">
    </div>

    <div class="form-group">
      <label for="matricula">Fecha de matrícula</label>
      <input type="date" id="matricula" v-model="vehiculo.matricula" class="form-input">
    </div>

    <div v-if="mensaje" :class="['mensaje', tipoMensaje]">
      {{ mensaje }}
    </div>

    <div class="btn-container">
      <button @click="guardarVehiculo" class="btn-guardar">Guardar</button>
    </div>
  </div>
</template>

<script>
import ApiClient from '@/clients/ApiClient';

export default {
  data() {
    return {
      token: '',
      vehiculo: {
        marca: '',
        modelo: '',
        chasis: '',
        fabricacion: '',
        matricula: ''
      },
      mensaje: null,
      tipoMensaje: ''
    };
  },
  mounted() {
    this.token = '';
  },
  watch: {
    token(newVal) {
      if (newVal) {
        localStorage.setItem('token', newVal);
      }
    }
  },
  methods: {
    async guardarVehiculo() {
      this.mensaje = null;

      if (!this.vehiculo.marca || !this.vehiculo.modelo || !this.vehiculo.chasis || !this.vehiculo.fabricacion || !this.vehiculo.matricula) {
        this.mensaje = "Por favor complete todos los campos";
        this.tipoMensaje = "error";
        return;
      }

      const activeToken = this.token || localStorage.getItem('token');
      if (!activeToken) {
        this.mensaje = "Por favor ingrese un token válido";
        this.tipoMensaje = "error";
        return;
      }

      try {
        localStorage.setItem('token', activeToken);

        const payload = {
          marca: this.vehiculo.marca,
          modelo: this.vehiculo.modelo,
          chasis: this.vehiculo.chasis,
          fechaF: this.vehiculo.fabricacion,
          fechaMatricula: this.vehiculo.matricula
        };

        const response = await ApiClient.createVehiculo(payload);

        this.$emit('vehiculo-guardado', response.data);

        this.mensaje = "Vehiculo guardado exitosamente";
        this.tipoMensaje = "success";
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al guardar", error);
        let errorDetails = error.response?.data || error.message;
        this.mensaje = "Error al guardar: " + errorDetails;
        this.tipoMensaje = "error";
      }
    },
    limpiarFormulario() {
      this.vehiculo = { marca: '', modelo: '', chasis: '', fabricacion:'', matricula: '' };
    }
  }
};
</script>

<style scoped>
.formulario-container {
  border: 1px dashed #34495e;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
}


.title {
  color: #3498db;
  text-align: center;
}


.form-group {
  margin-bottom: 10px;
  text-align: left;
}

label {
  display: block;
  color: #3498db;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #34495e;
  border-radius: 5px;
  box-sizing: border-box;
}

.token-area {
  height: 60px;
  border-radius: 10px;
}

.btn-container {
  text-align: center;
  margin-top: 15px;
}

.btn-guardar {
  background-color: #00a8ff;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.mensaje {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
