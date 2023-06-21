
<script setup>
    import general from '../.vitepress/components/General.vue'
    import { useData } from 'vitepress'
    const { site } = useData()
    const filePath = (site.value.base === "/") ?  "/public/data/lessons.js" : site.value.base + "/data/lessons.js";
</script>

# Lessons

<general :data="filePath"></general>