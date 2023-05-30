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
    TO-DO: Add tab: refresh queris graphql + token auth student
    TO-DO: Move queris to template: update-teams & user-info
    TO-DO: Token autenticar github obtenido al login firebase (?)

    TO-DO: Roles (tomados de GitHub):
     - Profesor: owner / owners organizacion GitHub
     - Alumno: other people / teams
-->


<template>
    <!-- Check if is in principal -->
    <div>
        <!-- Check if user is logged to show login buttons if not -->
        <div v-if="!userlogged">
            <h1> LOGIN FIREBASE (GitHub) </h1>
            <button type="button" @click="login"> Login </button>
        </div>
        <!-- The user is logged, it shows a welcome -->
        <div v-else>
            Bienvenido {{currentUser}}
            <button type="button" @click="logout"> Logout </button>
        </div>
    </div>
</template>

<script>
    import "../css/auth-form.css";
    export default {
        data() {
            return {

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
                 * Firebase auth object
                 */
                auth: undefined,
            }
        },
        methods: {

            /**
             * Logout a user using Firebase auth
             */
            logout() {
                this.auth.signOut()
                    .then(function() {
                        this.userlogged = false;
                        alert("Singed out succesfully");
                    }, function(error) {                    
                        console.log(error.code)
                        alert(error.message);
                    });
            },

            /**
             * Login a user using Firebase auth with Github popup window
             */
            async login() {
                
                 if (!firebase.auth().currentUser) {
                    const provider = new firebase.auth.GithubAuthProvider();
                    provider.addScope('repo');
                    provider.setCustomParameters({
                        'allow_signup': 'false'
                    });
                    this.currentUser = await this.auth.signInWithPopup(provider).then(async function(result) {
                        var token = result.credential.accessToken;
                        localStorage.setItem('token', token);
                        return result.user.displayName;
                    }).catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.error(`${errorCode} | ${errorMessage}`);
                    });

                    if(this.currentUser != "") this.userlogged = true;
                } 
            },
        }
    }
</script>
