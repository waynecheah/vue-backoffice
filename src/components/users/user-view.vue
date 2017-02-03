<template lang="pug">
    div
      h3 User Detail
      span.txt user id: {{ $route.params.id }} vs {{ id }}

      v-text-input(v-model='userName', label='Username')
      v-text-input(v-model='password', label='Password', placeholder='Maximum 3 times attempt', type='password')
      v-btn(@click.native='login', info, ripple, round) Login
      v-btn(@click.native='logout', ripple, round) Logout
      v-btn(@click.native='test(userName)', outline, ripple, success, :disabled='!userName') Test
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'

    export default {
        name: 'gl-user-view',

        props: ['id'],

        data () {
            return {
                userName: '',
                password: ''
            };
        },

        methods: {
            ...mapActions('user/', [
                'test'
            ]),

            ...mapMutations('user/', [
                'logout'
            ]),

            login() {
                const { password='', userName='' } = this || {};
                this.$store.dispatch('user/login', { userName, password });
            }
        },

        created () {
            console.log('User view created');
        }
    }
</script>

<style lang="sass">
    button.btn
        margin: 10px 20px
    .input-group
        margin: 38px 20px 20px
    span.txt
        color: #333
        background-color: #fff
        font-size: 18px
        margin-left: 15px
        padding: 10px
</style>
