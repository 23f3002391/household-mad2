import Home from "../pages/Home.js"

import LoginPage from "../pages/LoginPage.js"
import RegisterPage from "../pages/RegisterPage.js"
import Admin_D from "../pages/Admin_D.js"
import Customer_D from "../pages/Customer_D.js"
import Professional_D from "../pages/Professional_D.js"
import CustomReg from "../pages/CustomReg.js"
import ProfReg from "../pages/ProfReg.js"
import admin_search from "../pages/admin_search.js"
import customer_search from "../pages/customer_search.js"
import admin_summary from "../pages/admin_summary.js"
// import c_profile from "../pages/c_profile.js"

import store from "./store.js"

const routes= [
    { path:"/", component: Home},
    { path: "/login", component: LoginPage },
    {path : '/register', component : RegisterPage},
    {path:'/admin_d',component: Admin_D, meta:{ requiresLogin: true,role:"admin"} },
    {path:'/customer_d',component: Customer_D, meta:{ requiresLogin: true,role:"customer"} },
    {path:'/professional_d',component: Professional_D, meta:{ requiresLogin: true, role:"professional"} },
    {path: '/customReg', component:CustomReg},
    {path:'/profReg',component: ProfReg},
    {path:'/admin_search',component: admin_search, meta:{ requiresLogin: true, role:"admin"} },
    {path:'/c_search',component: customer_search, meta:{ requiresLogin: true, role:"customer"} },
    {path:'/admin_summary',component: admin_summary, meta:{ requiresLogin: true, role:"admin"} },
    // {path:'/edit_customer/:id',component: c_profile, meta:{ requiresLogin: true, role:"customer"} }
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