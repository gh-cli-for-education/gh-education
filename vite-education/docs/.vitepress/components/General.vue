<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente General para mostrar información pública
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 21/04/2023
 * @file Este fichero contiene el componente General
-->

<template>
  <div>   
    <ul v-if="(role !== null) || role === 'owner'">
      <!-- Loop over the array of data -->
      <li v-for="(task, index) in general" :key="index">
        <h2>{{ task.text }}</h2>
        <ul>
          <!-- Loop over the subsections of the data -->
          <div v-for="(item, section) in task.items" :key="section">
            <li v-if="(!item.hidden && role !== null) || role === 'owner'">
              <a :href="item.link">{{item.text}}</a> &nbsp; &nbsp;
              <div v-if="role === 'owner'">
                <button class="eyebtn" @click="toggleShow(item)"> 
                    <span v-if="item.hidden"> Hide  </span>
                    <span v-else> Show  </span>
                </button>
              </div>
            </li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

import store from '../public/store/index'
import { getApps } from 'firebase/app'

export default {
  data() {
    return {     

      /**
       * Array with the public information to show
       */ 
      general: [],

      show: false,
      role:null
    }
  },
  props: {
    /**
     * String with the file with the data to dynamic import
     */
     data: {
      type: String,
      required: true,
    }
  },
  computed: {
    buttonLabel() {
      return (this.show) ? "Hide" : "Show";
    }
  },

  methods: {

    toggleShow(item) {
      console.log(item);
      this.show = !this.show;
    },

  },     
  
  async beforeMount() {
      if (getApps().length === 0 )
          console.log("no autenticado");
      else {
          const storeData = store.getters.userData;
          this.role = storeData.role;
          let info = await import(/* @vite-ignore */this.data); 
          this.general = info.default.data;
      }
  },
}
</script>

<style>
.row {
  display: flex;
}

.column {
  flex: 50%;
}

button{
    margin-top: 50px;
    width: 50%;
    background-color: #ffffff;
    padding: 15px 0;
    color: #080710;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    padding: 14px 20px;
    cursor: pointer;
}

.eyebtn {
    width: 15%;
    background-color: #ffffff;
    padding: 15px 0;
    color: #080710;
    font-size: 12px;
}
</style>
