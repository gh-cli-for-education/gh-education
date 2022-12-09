<template>
   
    <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
        <form>
            <h3>Register</h3>
            <label for="username">Email</label>
            <input id="username" type="email" name="email" class="form-control" placeholder="example@gmail.com" v-model="email" required/>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" class="form-control" placeholder="Password" v-model="password" required/>

            <label for="password">Repeat Password</label>
            <input id="password" v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>

            <button @click="register"> Register </button>
            
            <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
            </p>
        </form>
    </div>
               
</template>

<script>
  import * as firebase from 'firebase/compat/app'

  export default{
    data() {
        return {
            email: "",
            password: "",
            confirmReg: "",
            registerActive: false,
            emptyFields: false
        }
    },
    methods: {
        register() {
            if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
                this.emptyFields = true;
            } else {
                auth
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then((data) => {
                        alert("You are now registered");
                    })
                    .catch(error => {
                        console.log(error.code)
                        alert(error.message);
                    });
            }
        }
    }
  }
</script>

