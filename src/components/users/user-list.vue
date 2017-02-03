<template lang="pug">
    div
      .panel.panel-flat(:class='{ hide: hideListing }')
        h2 User Listing

      router-view
</template>

<script>
export default {
    name: 'gl-user-list',

    data () {
        return {
            hideListing: false
        };
    },

    methods: {
        checkRoute () {
            if (this.$route.name == 'User Listing') this.hideListing = false;
            else this.hideListing = true;
        }
    },

    beforeRouteEnter (to, from, next) {
        //console.log('USER LIST before enter', to, from);

        next(vm => {
            if (to.name == 'User Listing') vm.hideListing = false;
            else vm.hideListing = true;
        });
    },

    watch: {
        //'$route': 'checkRoute',
        $route () {
            if (this.$route.name == 'User Listing') this.hideListing = false;
            else this.hideListing = true;
        }
    }
}
</script>

<style lang="sass">
    .hide
        display: none
</style>
