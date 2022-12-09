<template>

        <div v-if="principalView">
            si
            <div v-if="!userlogged">
                <button @click="changeView(false, '')"> Login </button>
                <button @click="changeView(true, '')"> Register </button>
            </div>
            <button @click="logout"> Logout </button>
        </div>
        <div v-else="authView">
            <Auth register=register></Auth>
        </div>
        

        <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>

</template>

<script>
    import "../css/auth-form.css";
    import Auth from './Auth.vue'
    export default {
        data() {
            return {
                principalView: true,
                authView: false,
                userlogged: false,
                currentUser: "",
                register:false
            }
        },
        components: {
            Auth
        },
        methods: {
            changeView(register, user) {
                this.principalView = !this.principalView;
                this.authView = !this.authView;
                if(register) { this.register = register; }
                if(user) {
                    this.userlogged = true; 
                    this.currentUser = user;
                }
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
            }
        }
    }
</script>

