
<script setup>
    import general from '../.vitepress/components/General.vue'
    import { useData } from 'vitepress'
    const { site } = useData()
    const filePath = (site.value.base === "/") ?  "/public/data/units.js" : site.value.base + "/data/units.js";
</script>

# Tasks

<general :data="filePath"></general>