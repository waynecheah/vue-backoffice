<template lang="pug">
    .panel
      .panel-heading
        .panel-title User Form
          span.panel-subtitle user id: {{ id }}
        .heading-elements
          ul.icons-list
            li
              a.collapse

      .panel-body
        form(@submit.prevent='create')
          v-text-input(v-model='model.username', label='Username')
          v-text-input(v-model='model.password', label='Password', placeholder='Use at least 8 characters', type='password')
          v-text-input(v-model='model.firstname', label='First name')
          v-text-input(v-model='model.lastname', label='Last name')
          v-text-input(v-model='model.email', label='E-mail', type='email')
          v-text-input(v-model='model.description', label='Description', type='textarea')

          .text-right
            v-btn(flat, ripple) Cancel
            span &nbsp;
            v-btn.vtop(success, ripple, type='submit')
              v-icon(left) note_add
              | Create
          .pre {{ model }}
</template>

<script>
    export default {
        name: 'gl-user-form',

        props: ['id'],

        data () {
            return {
                model: {
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    description: ''
                }
            };
        },

        methods: {
            create () {
                console.log('log', this.model);
            },

            udpate () { }
        },

        created () { }
    }
</script>

<style lang="sass">
    form
        margin-top: 20px
</style>
