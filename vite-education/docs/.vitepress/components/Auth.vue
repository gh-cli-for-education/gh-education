<template>
    <div v-if="!userlogged">
        <div v-if="register && alreadyRegister" class="card login" v-bind:class="{ error: emptyFields }">
            <form>
                <h3>Register</h3>
                <label for="username">Email</label>
                <input id="username" type="email" name="email" class="form-control" placeholder="example@gmail.com" v-model="email" required/>

                <label for="password">Password</label>
                <input id="password" type="password" name="password" class="form-control" placeholder="Password" v-model="password" required/>

                <label for="password">Repeat Password</label>
                <input id="rppassword" v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>

                <button @click="register"> Register </button>
                
                <p>Already have an account? <a href="#" @click="alreadyRegister = !alreadyRegister, emptyFields = false">Sign in here</a>
                </p>
            </form>
        </div>
        
        <div v-else>
            <form>
                <h3>Login</h3>
                <label for="username">Email</label>
                <input id="username" type="email" name="email" class="form-control" placeholder="example@gmail.com" v-model="email" required/>

                <label for="password">Password</label>
                <input id="password" type="password" name="password" class="form-control" placeholder="Password" v-model="password" required/>

                <button @click="login"> Login </button>

                <button @click="logout"> Logout </button>
                
                <p>Don't have an account? <a href="#" @click="alreadyRegister = !alreadyRegister, emptyFields = false">Register in here</a></p>
            </form>
        </div>
    </div>
               
</template>

<script>
    import "../css/auth-form.css";
  import * as firebase from 'firebase/compat/app'

  export default{
    data() {
        return {
            email: "",
            password: "",
            confirmReg: "",
            alreadyRegister: true,
            userlogged: false,
            currentUser: "",
            emptyFields: false
        }
    },
    prop: {
        register: Boolean
    },
    methods: {
        login() {
            if (this.emailReg === "" || this.passwordReg === "") {
                this.emptyFields = true;
            } else {
                auth
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then((data) => {
                        this.currentUser = data.currentUser;
                        console.log(this.currentUser)
                    })
                    .catch(error => {
                        console.log(error.code)
                        alert(error.message);
                    });
            }
        },
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
