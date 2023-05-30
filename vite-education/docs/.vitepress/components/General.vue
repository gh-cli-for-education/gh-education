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
    <div v-if="token">
      <button type="button" @click="reresh()"> 🔄 Refresh data </button>
    </div> 
    <ul>
      <!-- Loop over the array of data -->
      <li v-for="(task, index) in general" :key="index">
        <h2>{{ task.text }}</h2>
        <ul>
          <!-- Loop over the subsections of the data -->
          <div v-for="(item, section) in task.items" :key="section">
	    <li v-if="(!item.hidden && role !== null) || role === 'owner'">
            	<a :href="item.link">{{item.text}}</a> &nbsp; &nbsp;
        	<button class="eyebtn" @click="toggleShow(item)"> 
			<span v-if="item.hidden"> Hide  </span>
			<span v-else> Show  </span>
		</button>
	    </li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {     

      /**
       * Array with the public information to show
       */ 
      general: [],

      token: this.checkLocalData('token'),

      role: this.checkLocalData('role'),

      show: false
    }
  },
  props: {
    /**
     * String with the file with the data to dynamic import
     */
    unit: {
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
    async refresh() {
      this.token = localStorage.getItem('token');
      console.log(response);
    },


    toggleShow(item) {
      console.log(item);
      this.show = !this.show;
    },
	
    checkLocalData(name) {
	const data = localStorage.getItem(`${name}`);
	return (data) ? data : null;
    },

  },

  /**
   * Called after the component mounted doing dynamic import depending on
   * the data passed with argument.
   * @see [Await dynamic Import](https://stackoverflow.com/questions/55274868/awaiting-on-dynamic-imports-in-javascript)
   */
  async mounted() {
    let info = await import(/* @vite-ignore */this.unit); 
    this.general = info.default.data;
  }
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
