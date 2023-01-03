<template>

        <div v-if="principalView">
            <div v-if="!userlogged">
                <h1> LOGIN FIREBASE </h1>
                <button type="button" @click="changeView(false)"> Login </button>
                <button type="button" @click="changeView(true)"> Register </button>
            </div>
            <div v-else>
                Bienvenido {{currentUser}}
                <button type="button" @click="logout"> Logout </button>
            </div>
        </div>
        <div v-else="authView">
            <div v-if="!userlogged">
                <div v-if="alreadyRegister" class="card login" v-bind:class="{ error: emptyFields }">
                    <form>
                        <h3>Register</h3>
                        <label>Username</label>
                        <input id="username" name="username" class="form-control" placeholder="username" v-model="user" required/>

                        <label for="username">Email</label>
                        <input id="email" type="email" name="email" class="form-control" placeholder="example@gmail.com" v-model="email" required/>

                        <label for="password">Password</label>
                        <input id="password" type="password" name="password" class="form-control" placeholder="Password" v-model="password" required/>

                        <label for="password">Repeat Password</label>
                        <input id="rppassword" type="password" class="form-control" placeholder="Confirm Password" v-model="confirmReg" required>

                        <button type="button" @click="registerUser"> Register </button>
                        
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

                        <button type="button" @click="login"> Login </button>
                        
                        <p>Don't have an account? <a href="#" @click="alreadyRegister = !alreadyRegister, emptyFields = false">Register in here</a></p>
                    </form>
                </div>
            </div>
        </div>

</template>

<script>
    import "../css/auth-form.css";
    import * as firebase from 'firebase/compat/app'
    export default {
        data() {
            return {
                principalView: true,
                authView: false,
                userlogged: false,
                currentUser: "",
                register:false,
                
                user: "",
                email: "",
                password: "",
                confirmReg: "",
                alreadyRegister: false,
                emptyFields: false
            }
        },
        methods: {
            changeView(register) {
                this.principalView = !this.principalView;
                this.authView = !this.authView;
                this.alreadyRegister = register;
            },
            logout() {
                auth.signOut()
                    .then(function() {
                        this.userlogged = false;
                        alert("Singed out succesfully");
                    }, function(error) {                    
                        console.log(error.code)
                        alert(error.message);
                    });
            },
            login() {
                if (this.emailReg === "" || this.passwordReg === "") {
                    this.emptyFields = true;
                } else {
                    auth.signInWithEmailAndPassword(this.email, this.password).then((data) => {
                            this.userlogged = true;
                            this.principalView = !this.principalView;
                            this.authView = !this.authView;
                            this.currentUser = auth.currentUser.displayName;
                            localStorage.setItem('userLogged', auth.currentUser.displayName);                       
                    })
                    .catch(error => {
                        console.log(error.code)
                        alert(error.message);
                    });
                }
            },
            registerUser() {    
  
                if (this.email === "" || this.password === "" || this.confirmReg === "") {
                    this.emptyFields = true;
                } else {
                    auth
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then((data) => {
                            this.alreadyRegister = true;
                            alert("You are now registered");
                            this.principalView = !this.principalView;
                            this.authView = !this.authView;
                            return data.user.updateProfile({
                                displayName: this.user
                            })
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