<script setup>
import { useData } from 'vitepress'

const everyThing = useData()

console.log(everyThing.theme)

</script>

## theme

<pre>
{{ everyThing.theme }}
</pre>


