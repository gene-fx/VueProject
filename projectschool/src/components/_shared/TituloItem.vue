<template>
    <div>
        <h1>{{texto}}</h1>
    </div>
</template>

<script>
    export default {
     props:{
        texto: String,
     }   
    }
</script>

<style scoped>
    h1{
        font-size: 3em;
        font-weight: bold;
    }
</style>