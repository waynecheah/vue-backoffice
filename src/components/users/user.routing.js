const UserBlank = { template: '<div></div>' };
const UserForm  = r => require.ensure([], () => r(require('./user-form.vue')), 'group-user');
const UserList  = r => require.ensure([], () => r(require('./user-list.vue')), 'group-user');
const UserView  = r => require.ensure([], () => r(require('./user-view.vue')), 'group-user');
const title     = 'User Management';

export default [
    {
        path: '/users',
        redirect: '/users/list',
        component: UserList,
        children: [
            {
                path: 'form/:id',
                name: 'User Form',
                component: UserForm,
                meta: {
                    breadcrumb: 'User Form',
                    canActivate: true,
                    title
                },
                props: true
            },
            {
                path: 'list',
                name: 'User Listing',
                component: UserBlank,
                meta: { title }
            },
            {
                path: 'view/:id',
                name: 'User Detail',
                component: UserView,
                meta: {
                    breadcrumb: 'User Detail',
                    canActivate: true,
                    title
                },
                props: true
            }
        ],
        meta: {
            breadcrumb: 'All Users',
            canActivate: true,
            title
        }
    }
];
