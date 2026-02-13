<template>
  <div id="app-container">
    <nav>
      
      <router-link to="/generar-token">Generar Token</router-link> |
      <router-link to="/guardar-vehiculo">Guardar Vehiculo</router-link>

    </nav>
    <router-view />
  </div>
</template>

<script>
import ApiClient from '@/clients/ApiClient';

export default {
  data() {
    return {
      isLoggedIn: false,
      username: '',
      userRole: ''
    };
  },
  computed: {
    isLoginRoute() {
      return this.$route.path === '/login';
    },
    isAdmin() {
      return this.userRole === 'admin';
    }
  },
  watch: {
    $route() {
      this.checkAuth();
    }
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      this.username = localStorage.getItem('user') || '';
      this.userRole = localStorage.getItem('role') || '';
    },
    logout() {
      ApiClient.logout();
      this.isLoggedIn = false;
      this.userRole = '';
      this.$router.push('/login');
    }
  }
}
</script>

<style>

.logout-toast {
  background-color: #34495e;
  color: white;
  padding: 10px 20px;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



nav {
  padding: 30px;
}



nav a {
  font-weight: bold;
  color: #2c3e50;
}



nav a.router-link-exact-active {
  color: #42b983;
}

</style>
