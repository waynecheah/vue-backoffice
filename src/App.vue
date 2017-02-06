<template lang="pug&doctype=html">
  .rel
    .pageContainer
      .sideBar(:class='{ mini: minibar }')
        .navBar.noWrap
          .logo COMPANY LOGO
          .smallLogo
            v-icon home
        .mainMenu
          ul
            li.navigationHeader
              span Main
            li.main(v-for='i in sideMenu', :class='{ active:i.expanded }')
              a.rel(@click='toggleMainMenu(i)', :href='i.url')
                .item.has-ripple
                  md-ink-ripple
                  v-icon(v-if='i.icon', left) {{ i.icon }}
                  span {{ i.name }}
                  v-icon.right(v-if='i.children.length > 0') keyboard_arrow_right
              .expand(
                v-if='i.children.length > 0',
                v-accordion='i.expanded'
              )
                ul
                  li(v-for='j in i.children')
                    router-link.sub.has-ripple(v-if='j.route', :to='j.route')
                      md-ink-ripple
                      span {{ j.name }}
                    a.sub.has-ripple(v-else-if='j.url', :href='j.url')
                      md-ink-ripple
                      span {{ j.name }}

      .pageContent
        .navBar
          a.menuIcon(@click='toggleSideMenu', href='#!')
            v-icon.text--darken-2 menu
        .contentWrapper
          gl-breadcrumb
          router-view

    glSnackbars
    

    //md-toolbar.md-dense
      md-button.md-icon-button(@click='toggleLeftSidenav')
        md-icon menu
      h2.md-title(style='flex: 1;') TEST
      md-button(@click='toggleLeftSidenav') Toggle
      md-button(v-dropdown:dropdown) Dropdown
      v-dropdown#dropdown(:items='menu', right)

        md-sidenav(
          ref='leftSidenav',
          :class="{ 'md-fixed':sidebar, 'md-left':!sidebar }",
          @open='open',
          @close='close'
        )
          md-toolbar.md-large
            .md-toolbar-container
              h3.md-title MAIN MENU
          p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse 
            necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi 
            commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!
</template>

<script>
import Vue from 'vue'

//import glNavBar from './components/layout/navbar.vue'
import glBreadcrumb from './components/shared/navigations/breadcrumb.vue'
import glSnackbars from './components/shared/notifications/snackbars.vue'


Vue.directive('accordion', {
    bind (el, binding, vnode) {
        el.style.height = 0;
    },

    update (el, binding, vnode) {
        if (binding.value == binding.oldValue) return;

        if (binding.value) {
            el.style.position   = 'absolute';
            el.style.visibility = 'hidden';
            el.style.height     = 'auto';

            const style = getComputedStyle(el);
            let height = el.offsetHeight;

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);

            el.style.height     = 0;
            el.style.position   = 'static';
            el.style.visibility = 'visible';
            setTimeout(() => el.style.height = `${height}px`, 0);
        } else {
            el.style.height = 0;
        }
    }
});


export default {
    name: 'app',

    components: {
        glBreadcrumb,
        //glNavBar,
        glSnackbars
    },

    data () {
        return {
            menu: [{
                href: '#!',
                ripple: true,
                text: 'Menu 1'
            }, {
                href: '#!',
                ripple: true,
                text: 'Menu 2'
            }, {
                href: '#!',
                ripple: true,
                text: 'Menu 3'
            }],
            sideMenu: [{
                children: [{
                    name: 'Sub Menu 1.1',
                    url: '#!'
                }, {
                    name: 'Sub Menu 1.2',
                    url: '#!'
                }],
                expanded: false,
                icon: 'insert_emoticon',
                name: 'Main Menu 1',
                url: '#!'
            }, {
                children: [{
                    name: 'Sub Menu 2.1',
                    url: '#!'
                }, {
                    name: 'Sub Menu 2.2',
                    url: '#!'
                }],
                expanded: false,
                icon: 'supervisor_account',
                name: 'Main Menu 2',
                url: '#!'
            }, {
                children: [{
                    name: 'User List',
                    route: '/users/list'
                }, {
                    name: 'User Detail',
                    route: '/users/view/123'
                }, {
                    name: 'User Form',
                    route: '/users/form/456'
                }],
                expanded: false,
                icon: 'account_circle',
                name: 'User Mgt',
                url: 'javascript:;'
            }],
            minibar: false,
            toggle: false,
            toggle2: false
        };
    },

    methods: {
        close () {
            console.log('close sidebar');
        },

        open () {
            console.log('open sidebar');
        },

        toggleMainMenu (obj) {
            this.sideMenu.map(itm => {
                if (obj.name == itm.name) itm.expanded = !itm.expanded;
                else itm.expanded = false;
            });
        },

        toggleSideMenu () {
            this.minibar = !this.minibar;
        }
    },

    mounted () {
        this.$vuetify.init();
    }
}
</script>

<style lang="sass">
$headerHeight: 50px
$sidebarWidth: 260px

a:hover
    text-decoration: none !important

body.appBody
    background-color: #eeeded
    &.md-theme-default
        a
            color: #1976d2
        background-color: #eeeded


.icons-list
    margin: 0
    padding: 0
    list-style: none
    line-height: 1
    font-size: 0
    li
        display: inline-block
        font-size: 13px
        position: relative
        &:first-child
            margin-left: 0
        a.collapse
            color: #333
            vertical-align: middle
            &:after
                content: '\e9c1'
                display: inline-block
                font-family: 'icomoon'
                font-size: 16px
                line-height: 1
                min-width: 16px
                text-align: center
                vertical-align: middle
                -webkit-font-smoothing: antialiased
.noWrap
    white-space: nowrap
.panel
    background-color: #fff
    border: 1px solid transparent
    border-radius: 3px
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
    color: #333
    margin-bottom: 20px

    .panel-heading
        border-top-left-radius: 3px
        border-top-right-radius: 3px
        padding: 20px
        position: relative
        .panel-title
            color: #999
            font-size: 16px
            font-weight: 500
            text-transform: uppercase
            .panel-subtitle
                color: inherit
                display: block
                font-size: 13px
                margin-top: 3px
        .heading-elements
            height: 38px
            margin-top: -19px
            position: absolute
            right: 20px
            top: 50%
            .icons-list
                margin-top: 11px
    .panel-body
        padding: 0 20px 20px
        position: relative
.rel
    position: relative
.rotate-180
    transform: rotate(180deg)
.text-right
    text-align: right
.vtop
    vertical-align: top


.pageContainer
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: flex-start
    align-content: flex-start
    align-items: stretch
    height: 100vh

    .sideBar
        position: relative
        flex-grow: 1
        flex-shrink: 0
        flex-basis: 200px
        max-width: $sidebarWidth
        background-color: #263238
        overflow: hidden
        transition: max-width 80ms ease-out

        a:focus, a:hover, a:visited
            text-decoration: none !important
        a:focus
            outline: 0
        a:hover
            color: #fff !important
        a
            color: rgba(255, 255, 255, .5) !important

        &.mini
            max-width: 50px
            &:hover
                position: absolute
                width: $sidebarWidth
                max-width: $sidebarWidth
                height: 100vh
                z-index: 1
                .mainMenu li
                    .expand
                        position: static !important
                        visibility: visible !important
                    .icon.right
                        opacity: 1
                .navBar
                    .logo
                        display: block
                    .smallLogo
                        display: none
            .navBar
                .logo
                    display: none
                .smallLogo
                    display: flex
            .mainMenu li
                .expand
                    position: absolute !important
                    visibility: hidden !important
                .icon.right
                    opacity: 0
        .navBar
            position: absolute
            width: 100%
            height: $headerHeight
            max-height: $headerHeight
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
            line-height: $headerHeight
            color: #2196f3
            font-weight: bold

            .logo
                font-size: 16px
                padding-left: 20px
            .smallLogo
                display: none
                flex-wrap: nowrap
                justify-content: center
                height: $headerHeight
        .mainMenu
            position: absolute
            top: $headerHeight
            bottom: 0
            left: 0
            right: 0
            margin-top: 2px
            overflow: auto

            ul
                font-size: 14px
                li.navigationHeader
                    color: rgba(255, 255, 255, 0.5)
                    font-size: 11px
                    font-weight: 400
                    line-height: 24px
                    padding: 10px 12px
                    text-transform: uppercase
                    &:hover
                        background-color: transparent
            li
                position: relative
                color: rgba(255, 255, 255, 0.75)
                line-height: 12px
                white-space: nowrap


                &.active
                    .icon.right
                        transform: rotate(90deg)
                    a.rel, a.rel:hover
                        background-color: #304047
                        color: #fff
                a.rel
                    display: block
                    &:hover
                        background-color: rgba(0, 0, 0, 0.1)

                .item
                    max-width: $sidebarWidth - 40px
                    overflow: hidden
                    padding: 10px 12px
                    span
                        display: inline-block
                        font-weight: bold
                        line-height: 24px
                        padding-left: 15px
                        vertical-align: top
                .expand
                    overflow: hidden
                    background-color: rgba(0, 0, 0, .15)
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05)
                    transition: height 200ms ease-out

                    li
                        &:first-child
                            padding-top: 10px
                        &:last-child
                            padding-bottom: 10px
                        a.sub
                            display: block
                            line-height: 21px
                            padding: 10px 20px 10px 50px
                            position: relative
                            &:focus, &:hover
                                background-color: rgba(0, 0, 0, 0.1)
                                color: #fff
                .icon.right
                    position: absolute
                    right: 10px
                    font-weight: 100
                    transition: transform 200ms ease-in-out, opacity 150ms ease-out
            .md-theme-default.md-list
                background-color: transparent

    .pageContent
        position: relative
        flex-grow: 1
        flex-shrink: 0
        flex-basis: 200px

        .navBar
            background-color: #fff
            position: absolute
            width: 100%
            height: $headerHeight
            max-height: $headerHeight
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)

            .menuIcon
                display: flex
                width: 48px
                height: $headerHeight
                justify-content: center
                color: grey

                &:hover, &:visited
                    text-decoration: none
                &:focus
                    color: #2196f3
        .contentWrapper
            position: absolute
            top: $headerHeight
            bottom: 0
            left: 0
            right: 0
            margin-top: 2px
            padding: 20px
            overflow: auto


.slide-enter-active
    animation: slide-in 200ms ease-out forwards

.slide-leave-active
    animation: slide-out 200ms ease-out forwards
.slide-move
    transition: transform 200ms ease-out

@keyframes slide-in
    from
        transform: traslateY(-100%)
    to
        transform: translateY(0)
@keyframes slide-out
    from
        transform: translateY(0)
    to
        transform: traslateY(-100%)
</style>
