<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Auth shows the authentication view and handle it
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Auth
-->

<!-- 
    TO-DO: Add tab: refresh queris
    TO-DO: Move queris to template: update-teams & user-info

    TO-DO: Auth username Firebase: Use github username
    TO-DO: Autenticacion Firebase -> usar GitHub

    TO-DO: Roles (tomados de GitHub):
     - Profesor: owner / owners organizacion GitHub
     - Alumno:
-->


<template>
    <!-- Check if is in principal -->
    <div v-if="principalView">
        <!-- Check if user is logged to show login buttons if not -->
        <div v-if="!userlogged">
            <h1> LOGIN FIREBASE </h1>
            <button type="button" @click="changeView(false)"> Login </button>
            <button type="button" @click="changeView(true)"> Register </button>
        </div>
        <!-- The user is logged, it shows a welcome -->
        <div v-else>
            Bienvenido {{currentUser}}
            <button type="button" @click="logout"> Logout </button>
        </div>
    </div>
    <!-- Check if is in the authentication view -->
    <div v-else="authView">
        <!-- Check if user is logged to show login form if not -->
        <div v-if="!userlogged">
            <!-- Check if user change to register form -->
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
            
            <!-- Check if user change to login form -->
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
    export default {
        data() {
            return {

                /**
                 * Initial view for non authenticated users
                 * @values true, false
                 */
                principalView: true,

                /**
                 * Authentication view for non authenticated users
                 * @values true, false
                 */
                authView: false,

                /**
                 * Check if user is logged or not
                 * @values true, false
                 */
                userlogged: false,

                /**
                 * Once user is logged, here is storaged the name
                 */
                currentUser: "",

                /**
                 * Handle view changes
                 * @values true, false
                 */
                register:false,
                
                /**
                 * Storages username when registered
                 */
                user: "",
                
                /**
                 * Storages email when registered
                 */
                email: "",
                
                /**
                 * Storages password when registered
                 */
                password: "",
                
                /**
                 * Storages email confirmation when registered
                 */
                confirmReg: "",

                /**
                 * Check if user has been registered
                 * @values true, false
                 */
                alreadyRegister: false,

                /**
                 * Handle if there are any empty fields in form input
                 * @values true, false
                 */
                emptyFields: false
            }
        },
        methods: {
            /**
             * Is called in order to change between principal and authentication view
             * 
             * @param {Boolean} register boolean to change views
             */
            changeView(register) {
                this.principalView = !this.principalView;
                this.authView = !this.authView;
                this.alreadyRegister = register;
            },

            /**
             * Logout a user using Firebase auth
             */
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

            /**
             * Login a user using Firebase auth, checking if there are any empty fields
             */
            login() {
                if (this.emailReg === "" || this.passwordReg === "") {
                    this.emptyFields = true;
                } else {
                    /**
                     * Firebase authentication using email and password
                     * 
                     * @param {String} this.email Email of the user to sign in
                     * @param {String} this.password Password of the user to sign in
                     */
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

            /**
             * Login a user using Firebase auth, checking if there are any empty fields
             */
            registerUser() {    
  
                if (this.email === "" || this.password === "" || this.confirmReg === "") {
                    this.emptyFields = true;
                } else {
                    /**
                     * Firebase registration using email and password
                     * 
                     * @param {String} this.email Email of the user to register
                     * @param {String} this.password Password of the user to register
                     */
                    auth.createUserWithEmailAndPassword(this.email, this.password)
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