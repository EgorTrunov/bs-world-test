<template>
    <div>
        <ul>
            <li v-for="(current, index) in currents" :key="index"> {{ current }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Todo',
    props: ['currents']
}
</script>