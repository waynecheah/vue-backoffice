<template lang="pug">
    div
      .panel.panel-flat(:class='{ hide: hideListing }')
        h2 User Listing
        div
          v-btn(@click.native='retrieveList()', info, ripple, round) Refresh Listing
        v-progress-circular.primary--text(v-show='loading', :width='3', indeterminate) loading..
        div.pre {{ getList('user') }}

      router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'gl-user-list',

    data () {
        return {
            hideListing: false,
            list: [],
            loading: false
        };
    },

    computed: {
        ...mapGetters([
            'getList'
        ])
    },

    methods: {
        ...mapActions([
            'loadList'
        ]),

        checkRoute () {
            if (this.$route.name == 'User Listing') this.hideListing = false;
            else this.hideListing = true;
        },

        retrieveList () {
            this.loading = true;
            this.loadList({
                api: '/users',
                cb: s => this.loading = false,
                name: 'user'
            });
        }
    },

    beforeRouteEnter (to, from, next) {
        //console.log('USER LIST before enter', to, from);

        next(vm => {
            if (to.name == 'User Listing') vm.hideListing = false;
            else vm.hideListing = true;
        });
    },

    created () {
        this.retrieveList();
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

    .pre
        margin: 20px 0
        white-space: pre

    .progress-circular
        margin: 10px 0 20px
        &> div
            font-size: 13px
            font-style: italic
            color: grey
            top: 43px
</style>
