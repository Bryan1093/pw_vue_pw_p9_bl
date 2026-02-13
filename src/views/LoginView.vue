<template>
    <div class="login-container">
        <div class="login-card">
            <h2>REGISTRAR VEHICULO</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input type="text" id="username" v-model="username" required placeholder="Ingrese su usuario" />
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model="password" required
                        placeholder="Ingrese su contraseña" />
                </div>
                <div class="form-group">
                    <label for="role">Rol</label>
                    <input type="text" id="role" v-model="role" required placeholder="admin o user" />
                </div>
                <button type="submit" :disabled="loading" class="login-btn">
                    {{ loading ? 'Ingresando...' : 'Ingresar' }}
                </button>
                <p v-if="error" class="error-msg">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import ApiClient from '@/clients/ApiClient';

export default {
    data() {
        return {
            username: '',
            password: '',
            role: '',
            loading: false,
            error: null
        };
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            this.error = null;
            try {
                await ApiClient.login(this.username, this.password, this.role);
                this.$router.push('/guardar-vehiculo');
            } catch (err) {
                console.error(err);
                this.error = 'Credenciales inválidas o error en el servidor.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background: transparent;
}

.login-card {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    border: 1px solid #e1e8ed;
}

h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #3498db;
    font-weight: 700;
}

.form-group {
    margin-bottom: 1.25rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 500;
    text-align: left;
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
}

.login-btn:hover {
    background-color: #2980b9;
}

.login-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.error-msg {
    color: #e74c3c;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
}
</style>
