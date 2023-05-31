<template>
    <div v-if="view === ''">
        <Auth :role=role :token=token 
            @changeRole="changeRole($event)"
            @changeToken="changeToken($event)"
            @changeView="changeView($event)">
        </Auth>
    </div>

    <div>
        <tabs class="tabs-component">
            <tab name="Lessons">                
                <General :role=role :token=token :data=units 
                    @changeRole="changeRole($event)"
                    @changeToken="changeToken($event)">
                </General>
            </tab>
            <tab name="Tasks">                
                <General :role=role :token=token :data=tasks 
                    @changeRole="changeRole($event)"
                    @changeToken="changeToken($event)">
                </General>
            </tab>
            <tab name="Units">           
                <General :role=role :token=token :data=lessons 
                    @changeRole="changeRole($event)"
                    @changeToken="changeToken($event)">
                </General>
            </tab>
        </tabs>
    </div>

    
</template>

<script>

    import Auth from "./Auth.vue";
    import General from "./General.vue";   
    import {Tabs, Tab} from 'vue3-tabs-component';

    export default {
        components: {
            Auth,
            General,
            Tabs,
            Tab
        },
        data() {
            return {
                token: "",
                role: "",
                view: "",
                units: '../public/units.js',
                tasks: '../public/tasks.js',
                lessons: '../public/lessons.js',
            }
        },
        methods: {
            changeRole(newRole) {
                console.log(newRole);
                this.role = newRole;
            },

            changeToken(newToken) {
                console.log(newToken);
                this.token = newToken;
            },

            changeView(newView) {
                console.log(newView);
                this.view = newView;
            }
        }
    }
</script>