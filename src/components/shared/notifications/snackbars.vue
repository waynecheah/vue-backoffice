<template lang="pug">
    md-snackbar(
        :md-duration='duration',
        :md-position='position',
        ref='snackbar'
    )
      span {{ message }}
</template>

<script>
    export default {
        name: 'gl-snackbars',

        data () {
            return {
                duration: 4000,
                message: '',
                position: 'bottom center'
            };
        },

        methods: {
            open (message) {
                this.message = message;
                this.$refs.snackbar.open();
            }
        },

        created () {
            this.$http.interceptors.response.use(response => response, error => {
                const { message='', response=null } = error || {};
                const { data=null } = response || {};
                const errorMessage = data.message || message;

                this.open(errorMessage);
            });
        }
    }
</script>

<style lang="sass">

</style>
