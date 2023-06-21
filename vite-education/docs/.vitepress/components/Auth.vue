<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Auth shows the authentication view and handle it
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Auth
-->

<template>
    <div>
        <!-- Check if user is logged to show login buttons if not -->
        <div v-if="role == null">
            <h1> LOGIN FIREBASE (GitHub) </h1>
            <button type="button" @click="login" cla> Login </button>
        </div>
        <!-- The user is logged, it shows a welcome -->
        <div v-else>
            Welcome {{role}} {{currentUser}}
	        <button type="button" @click="logout"> Logout </button>
        </div>
    </div>
</template>

<script >

    import store from '../../public/data/store/index.js'

    export default {
        data() {
            return {
                userlogged: false,
                role: null,
                currentUser:null
            }
	    },
        methods: {

            /**
             * Logout a user using Firebase auth
             */
            async logout() {                
	            await store.dispatch('logout', {});
                this.role = null;
                this.currentUser = null;
            },

            /**
             * Login a user using Firebase auth with Github popup window
             */
            async login() {   
                await store.dispatch('login', { organization: import.meta.env.VITE_ORGANIZATION })
                const storeData = store.getters.userData;     
                this.role = storeData.role;
                this.currentUser = storeData.user.displayName;
            },
        },
  
        beforeMount() {
            const storeData = store.getters.userData;
            if (storeData.user) {
                this.role = storeData.role;
                this.currentUser = storeData.user.displayName;
            }
        },
    }
</script>

<style>
*,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}

form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}

input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}

::placeholder{
    color: #e5e5e5;
}

button{
    margin-top: 50px;
    width: 100%;
    background-color: #10B981;
    color: #ffffff;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    padding: 14px 20px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
     transform: translateX(-25px);
  }
  25% {
     transform: translateX(25px);
  }
  50% {
     transform: translateX(-25px);
  }
  75% {
     transform: translateX(25px);
  }
  100% {
     transform: translateX(0);
  }
}

</style>
