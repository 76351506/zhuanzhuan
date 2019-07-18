import Home from '@/containers/home';
import AddUser from '@/containers/user/adduser';
import Show from '@/containers/user/show';
import Login from '@/containers/login';

export default [{
    path: '/home',
    name: 'home',
    component: Home,
    children: [
        {
            path: '/home/adduser',
            name: 'adduser',
            component: AddUser
        },
        {
            path: '/home/show',
            name: 'show',
            component: Show
        }

    ]
}, {
    path: '/login',
    name: 'login',
    component: Login
}]