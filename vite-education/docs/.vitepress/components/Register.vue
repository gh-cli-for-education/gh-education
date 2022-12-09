<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script>
  import * as firebase from 'firebase/compat/app'

  export default{
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        register() {
            console.log(this.email, this.password)
            auth
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((data) => {
                    console.log('Successfully registered!');
                })
                .catch(error => {
                    console.log(error.code)
                    alert(error.message);
                });
        }
    }
  }
</script>

