import { createStore } from 'vuex'

//Firebase imports
import { auth } from '../../firebase'
import {
    GithubAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth'

const store = createStore({
    state: {
        //The  state will initially be null. After login, this state will be updated
        user: null,
        token: null,
        role: null
    },
    mutations: {
        //Mutation to update the user state
        //Takes in two arguments, the state and the payload. When we call this mutation, the payload will be user object from firebase auth
        //When the user logs out, we call the mutation and the payload will be null
        setUser(state, payload) {
            state.user = payload
        },

        setToken(state, payload) {
            state.token = payload
        },

        setRole(state, payload) {
            state.role = payload
        }
    },
    actions: {

        async login(context, { organization }){
            
            const provider = new GithubAuthProvider();
            provider.addScope('repo');
            provider.setCustomParameters({
                    'allow_signup': 'false'
            });        

            const result = await signInWithPopup(auth, provider)
            if (result) {                
                
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const endpoint = "https://api.github.com/user/memberships/orgs/" + organization;
    
                const response = await fetch(endpoint,{
                    method: "GET",
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                        Authorization: `token ${token}` 
                    }
                  })

                let organizationRole = await response.json();

                const role = (organizationRole.role == 'owner') ? 'teacher' : 'member'

                context.commit('setUser', result.user,)
                context.commit('setToken', token)
                context.commit('setRole', role)

            } else {
                throw new Error('login failed')
            }
        },

        async logout(context){
            await signOut(auth)
            
            sessionStorage.clear();

            context.commit('setUser', null)
            context.commit('setToken', null)
            context.commit('setRole', null)
        }
    },
    getters: {
        userData(state) {
            return {
                user: state.user,
                token: state.token,
                role: state.role
            }
        }
    },
    /*plugins: [
        createPersistedState({
          storage: (typeof window !== 'undefined') ? window.sessionStorage : undefined
        })
      ]*/
})

// export the store
export default store