
<script setup>
    import general from '../.vitepress/components/General.vue'
    import { useData } from 'vitepress'
    const { site } = useData()
    const filePath = (site.value.base === "/") ?  "/public/data/tasks.js" : site.value.base + "/data/tasks.js";
</script>

# Tasks

<general :data="filePath"></general>