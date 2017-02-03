<template lang="pug">
.breadcrumbWrap
  ul.breadcrumb
    li
      router-link(to='/')
        v-icon home
        span Home
    li(v-for='i in breadcrumbs')
      router-link(v-if='i.link', :to='i.route')
        span {{ i.name }}
      span(v-else) {{ i.name }}
</template>

<script>
import router from '../../../app.routes';

export default {
    name: 'gl-breadcrumb',

    data () {
        return {
            breadcrumbs: []
        }
    },

    methods: {
        generate (matched) {
            this.breadcrumbs = [];

            matched.map(itm=>{
                if (!itm.meta || !itm.meta.breadcrumb) return;

//                if (itm.instances && itm.instances.default)
//                    console.log(itm.instances.default.id);

                const link  = true;
                const name  = itm.meta.breadcrumb;
                const route = itm.redirect || itm.path;

                this.breadcrumbs.push({ link, name, route });
            });

            const total = this.breadcrumbs.length;
            if (total == 0) return;

            const n = total - 1;
            this.breadcrumbs[n].link = false;
        }
    },

    created () {
        this.generate(this.$route.matched);
        router.afterEach((to, from) => this.generate(to.matched));
    }
}
</script>

<style lang="sass" scoped>
    .breadcrumbWrap
        background-color: #fff
        border-radius: 3px
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
        margin: 20px 0
        padding: 10px 20px

    ul
        list-style: none
        padding: 

        &.breadcrumb
            li
                display: inline-block
            li + li:before
                content: "/"
                padding: 0 8px
                color: #333333
            li > a, li > span
                line-height: 16px

                &> i.icon
                    font-size: 16px
                    padding-right: 5px
                    vertical-align: sub
            li > span
                color: #999
</style>
