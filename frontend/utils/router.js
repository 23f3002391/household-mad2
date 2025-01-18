const Home = {
    template : `<h1> this is home </h1>`
}

import LoginPage from "../pages/LoginPage.js"
import RegisterPage from "../pages/RegisterPage.js"
import Admin_D from "../pages/Admin_D.js"
import Customer_D from "../pages/Customer_D.js"
import Professional_D from "../pages/Professional_D.js"
import CustomReg from "../pages/CustomReg.js"
import ProfReg from "../pages/ProfReg.js"

import store from "./store.js"

const routes= [
    { path:"/", component: Home},
    { path: "/login", component: LoginPage },
    {path : '/register', component : RegisterPage},
    {path:'/admin_d',component: Admin_D, meta:{ requiresLogin: true,role:"admin"} },
    {path:'/customer_d',component: Customer_D, meta:{ requiresLogin: true,role:"customer"} },
    {path:'/professional_d',component: Professional_D, meta:{ requiresLogin: true, role:"professional"} },
    {path: '/customReg', component:CustomReg},
    {path:'/profReg',component: ProfReg}
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresLogin)){
        if (!store.state.loggedIn){
            next({path : '/login'})
        } else if (to.meta.role && to.meta.role != store.state.role){
            alert('role not authorized')
             next({path : '/'})
        } else {
            next();
        }
    } else {
        next();
    }
})
export default router;