<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :line-numbers="true"
      theme="black-rhino"
    >
        <div slot="table-actions">
                 <span style="color:white">UP HERE</span>
        </div>
    </vue-good-table>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  components: {
    VueGoodTable,
  },
  name: "Tabla",
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Age",
          field: "age",
          type: "number",
        },
        {
          label: "Date",
          field: "date",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "d/MM/yy",
        },
        {
          label: "Rubric",
          field: "rubric",
          type: "any",
        },
      ],
      rows: [
        {
          id: 1,
          name: "github-alu-form",
          age: 20,
          date: "2022-02-17",
          rubric:
            '<a href="/practicas/esprima-logging.html#rubrica">rubrica</a>',
        },
        {
          id: 2,
          name: "github-campus-expert",
          age: 24,
          date: "2022-02-17",
          rubric:
            '<a href="/practicas/esprima-logging.html#rubrica">rubrica</a>',
        },
        {
          id: 3,
          name: "Project Board",
          age: 16,
          date: "2022-02-17",
          rubric:
            '<a href="/practicas/esprima-logging.html#rubrica">rubrica</a>',
        },
        {
          id: 4,
          name: "Visual Studio",
          age: 55,
          date: "2011-10-11",
          rubric: "/practicas/esprima-logging.html#rubrica",
        },
        {
          id: 5,
          name: "IAAS",
          age: 40,
          date: "2011-10-21",
          rubric: "/practicas/esprima-logging.html#rubrica",
        },
        {
          id: 6,
          name: "Esprima Logging",
          age: 20,
          date: "2022-02-24",
          rubric: "/practicas/esprima-logging.html#rubrica",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>