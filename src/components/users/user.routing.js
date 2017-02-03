import UserList from './user-list.vue';
// const UserList = {
//     template: '<div>User Listing</div>'
// };
const UserBlank = { template: '<div></div>' };
const UserView = {
    props: ['id'],
    template: `
<div>
    <h2>User Detail</h2>
    user id: {{ $route.params.id }} vs {{ id }}
</div>`
};

const title = 'User Management';

export default [
    {
        path: '/users',
        redirect: '/users/list',
        component: UserList,
        children: [
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
