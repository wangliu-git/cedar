// 配置路由数组的模块


import Login from '@/components/Login/Login.vue'
import Home from '@/components/Home/Home.vue'
import HomePage from '@/components/HomePage/HomePage.vue'
import DataEntry from '@/components/DataEntry/DataEntry.vue'
import DataImport from '@/components/DataImport/DataImport.vue'
import DataIntergration from '@/components/DataIntergration/DataIntergration.vue'
import Unit from '@/components/Unit/Unit.vue'


import DataManage from '@/components/DataManage/DataManage.vue'
import Shaix from '@/components/Shaix/Shaix.vue'
import Group from '@/components/Group/Group.vue'
import DataAnalysis from '@/components/DataAnalysis/DataAnalysis.vue'
import Medical from '@/components/Medical/Medical.vue'
import OCR from '@/components/OCR/OCR.vue'


// import Try from '@/components/Try/Try.vue'
import UserManagement from '@/components/UserManagement/UserManagement.vue'


export default [
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/home',
        component:Home,     
        children:[
            // 首页
            {
                path:'/homepage',
                component:HomePage,
            },
            
            // 数据录入
            {
                path:'/dataentry',
                component:DataEntry,       
            },
            // 数据导入
            {
                path:'/dataimport',
                component:DataImport,      
            },
            // 数据整合
            {
                path:'/dataintegration',
                component:DataIntergration ,
                redirect:'/unit',
                // 原单位报告
                children:[
                    {
                        path:'/unit',
                        component:Unit,
                    }
                ]  
            },
            // 数据管理
            {
                path:'/datamanage',
                component:DataManage,
                children:[
                    {
                        path:'/shaix',
                        component:Shaix,
                    },
                    {
                        path:'/group',
                        component:Group,
                    }
                ]     
            },
            // 数据分析
            {
                path:'/dataanalysis',
                component:DataAnalysis,
                children:[
                    {
                        path:'/medical',
                        component:Medical,
                    }
                ]      
            },
            // // 模拟试用
            // {
            //     path:'/try',
            //     component:Try       
            // },
            // 用户管理
            {
                path:'/usermanagement',
                component:UserManagement  
            },
            {
                path:'/ocr',
                component:OCR     
            },
        ]
    },   
    {
        path:'/',
        redirect:'/login'
    },

  
]
























