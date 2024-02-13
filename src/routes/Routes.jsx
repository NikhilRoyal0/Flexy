import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import ExAutoComplete from '../components/AutoComplete/ExAutoComplete';
import Dashboard from '../components/Dashboard/Dashboard';
import FullLayout from '../layouts/Sidebar/FullLayout'
import ExButton from '../components/Buttons/ExButton';



    const routes = createBrowserRouter(
        createRoutesFromElements(
       <Route path='/' element={<FullLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/autocomplete' element={<ExAutoComplete/>}/>
        <Route path='/button' element={<ExButton/>}/>
        <Route path='/checkbox' element={<FullLayout/>}/>
        <Route path='/radio' element={<FullLayout/>}/>
        <Route path='/slider' element={<FullLayout/>}/>
        <Route path='/switch' element={<FullLayout/>}/>
        <Route path='/form-layouts' element={<FullLayout/>}/>
        <Route path='/basic-table' element={<FullLayout/>}/>
          
        </Route>
        
    )
    )

 
export default routes;