import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import ExAutoComplete from '../components/AutoComplete/ExAutoComplete';
import Dashboard from '../components/Dashboard/Dashboard';
import FullLayout from '../layouts/Sidebar/FullLayout'
import ExButton from '../components/Buttons/ExButton';
import Checkmain from '../components/Checkbox/Checkmain';
import Radiomain from '../components/Radio/Radiomain';
import Slidermain from '../components/Slider/Slidermain';
import Switchmain from '../components/Switch/Switchmain';
import Formmain from '../components/Form/Formmain';
import Tablemain from '../components/Table/Tablemain';
import Registermain from '../components/Register/Registermain';
import AddUser from '../components/User/AddUser';
import UserList from '../components/User/UserList';
import PlansPage from '../components/Plans/PlansPage';
import NewsPage from '../components/News/NewsPage';
import AppSetting from '../components/Setting/AppSetting';
import BasicSetting from '../components/Setting/BasicSetting';
import DialogsList from '../components/Setting/DialogsList';
import BannersList from '../components/Setting/BannersList';
import TaskCategory from '../components/Tasks/TaskCategory';
import TaskList from '../components/Tasks/TaskList';
import Logout from '../components/LoginLogout/Logout';
import Login from '../components/LoginLogout/Login';
import Register from '../components/LoginLogout/Register'
import Notfound from '../components/NotFound/Notfound';


    const routes = createBrowserRouter(
        createRoutesFromElements(
       <Route path='/' element={<FullLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/autocomplete' element={<ExAutoComplete/>}/>
        <Route path='/button' element={<ExButton/>}/>
        <Route path='/checkbox' element={<Checkmain/>}/>
        <Route path='/radio' element={<Radiomain/>}/>
        <Route path='/slider' element={<Slidermain/>}/>
        <Route path='/switch' element={<Switchmain/>}/>
        <Route path='/form-layouts' element={<Formmain/>}/>
        <Route path='/basic-table' element={<Tablemain/>}/>
        <Route path='/register' element={<Registermain/>}/>
        <Route path='/plans' element={<PlansPage/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/user/add-user' element={<AddUser/>}/>
        <Route path='/user/user-list' element={<UserList/>}/>
        <Route path='/setting/app-setting' element={<AppSetting/>}/>
        <Route path='/setting/basic-setting' element={<BasicSetting/>}/>
        <Route path='/setting/dialogs-list' element={<DialogsList/>}/>
        <Route path='/setting/banners-list' element={<BannersList/>}/>
        <Route path='/tasks/task-category' element={<TaskCategory/>}/>
        <Route path='/tasks/task-list' element={<TaskList/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register-now' element={<Register/>}/>
        <Route path='*' element={<Notfound/>}/>
          
        </Route>
        
    )
    )

 
export default routes;