<template lang="pug">
    div
      h3 User Form
      span.txt user id: {{ id }}
</template>

<script>
    export default {
        name: 'gl-user-form',

        props: ['id'],

        data () {
            return { };
        },

        methods: { },

        created () { }
    }
</script>

<style lang="sass">
    span.txt
        color: #333
        background-color: #fff
        font-size: 18px
        margin-left: 15px
        padding: 10px
</style>
