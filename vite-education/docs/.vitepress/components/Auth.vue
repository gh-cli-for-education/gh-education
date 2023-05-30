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

    import { getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
    import { Octokit, App } from "https://esm.sh/octokit";

    export default {
        data() {
            return {

                /**
                 * Check if user is logged or not
                 * @values true, false
                 */
                userlogged: this.checkUserLogged(),

                /**
                 * Once user is logged, here is storaged the name
                 */
                currentUser: this.displayUserName(),
            }
	},
        methods: {

            /**
             * Logout a user using Firebase auth
             */
            logout() {
	       const auth = getAuth();
               const userState = auth.signOut()
                    .then(function() {

                        alert("Singed out succesfully");
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			return {
                        	userlogged: false,
				currentUser: ""
			};
                    }, function(error) {                    
                        console.log(error.code)
                        alert(error.message);
                    });
		this.userlogged = userState.userlogged;
		this.currentUser = userState.currentUser;
            },

	    checkUserLogged() {
		return (localStorage.getItem('user')) ? true : false;
	    },

	    displayUserName() {
		const user = localStorage.getItem('user');
		return (user) ? user : "";
	    },

            /**
             * Login a user using Firebase auth with Github popup window
             */
            async login() {
		const auth = getAuth();
                const provider = new GithubAuthProvider();
                provider.addScope('repo');
                provider.setCustomParameters({
                     'allow_signup': 'false'
                });
                this.currentUser = await signInWithPopup(auth, provider).then(async function(result) {
                        const credential = GithubAuthProvider.credentialFromResult(result);
    			const token = credential.accessToken;
			console.log(token);
                        const octokit = new Octokit({
                            auth: token
                        })
                        localStorage.setItem('token', token);
			localStorage.setItem('user', result.user.displayName);

			const response = await octokit.request('GET /user/memberships/orgs/{org}', {
                            org: 'gh-cli-for-education',
                            headers: {
                                'X-GitHub-Api-Version': '2022-11-28'
                            }
                        })
                        console.log(response);
                        return result.user.displayName;
                }).catch(function(error) {
                	var errorCode = error.code;
                	var errorMessage = error.message;
                	console.error(`${errorCode} | ${errorMessage}`);
                });

            	this.userlogged = this.checkUserLogged();
            },
        },
    }
</script>
