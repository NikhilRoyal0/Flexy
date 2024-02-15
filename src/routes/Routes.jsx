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
          
        </Route>
        
    )
    )

 
export default routes;