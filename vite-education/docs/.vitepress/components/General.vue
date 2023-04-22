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
    <ul>
      <!-- Loop over the array of data -->
      <li v-for="(task, index) in general" :key="index">
        <h2>{{ task.text }}</h2>
        <ul>
          <!-- Loop over the subsections of the data -->
          <li  v-for="(item, section) in task.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
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
      general: []
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

  /**
   * Called after the component mounted doing dynamic import depending on
   * the data passed with argument.
   * @see [Await dynamic Import](https://stackoverflow.com/questions/55274868/awaiting-on-dynamic-imports-in-javascript)
   */
  async mounted() {
    let info = await import(this.unit); 
    this.general = info.default.data;
  }
}
</script>