import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import FullLayout from '../layouts/Sidebar/FullLayout';
import Dashboard from '../components/Dashboard/Dashboard';
import ExAutoComplete from '../components/AutoComplete/ExAutoComplete';
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
import TasksList from '../components/Tasks/TaskList';
import Logout from '../components/LoginLogout/Logout';
import Login from '../components/LoginLogout/Login';
import Register from '../components/LoginLogout/Register';
import Notfound from '../components/NotFound/Notfound';
import EditUser from '../components/User/EditUser';
import EditTask from '../components/Tasks/EditTask';
import EditPlan from '../components/Plans/EditPlans';
import EditNews from '../components/News/EditNews';
import EditDialog from '../components/Setting/EditDialog';
import EditBanners from '../components/Setting/EditBanner';
import AddTask from '../components/Tasks/AddTask';
import AddPlan from '../components/Plans/AddPlan';
import AddNews from '../components/News/AddNews';
import AddBanner from '../components/Setting/AddBanner';
import AddDialog from '../components/Setting/AddDialog';
import Withdrawal from '../components/Wallet/Withdrawal';
import UpiList from '../components/Wallet/UPI/UpiList';
import Recharge from '../components/Wallet/Recharge_Request/Recharge';
import Notification from '../components/Setting/Notifications/Notification';
import NextWithdraw from '../components/Wallet/UpComing_Withdraw/NextWithdraw';
import Addon from '../components/Plans/AddOn/Addon';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register-now" element={<Register />} />
      <Route path="/logout" element={<Logout />} />


      <Route path="/" element={<FullLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/autocomplete" element={<ExAutoComplete />} />
        <Route path="/register" element={<Registermain />} />
        <Route path='/profile-setting' element={<BasicSetting />} />
        <Route path='/addon/add-on' element={<Addon />} />
        <Route path="addon/plans" element={<PlansPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/user/add-user" element={<AddUser />} />
        <Route path="/user/user-list" element={<UserList />} />
        <Route path='/wallet/withdrawal-request' element={<Withdrawal />} />
        <Route path='/upi-lists' element={<UpiList />} />
        <Route path='/recharge-request' element={<Recharge />} />
        <Route path='/setting/notifications' element={<Notification />} />
        <Route path='/wallet/next-withdraw' element={<NextWithdraw />} />
        <Route path="/setting/app-setting" element={<AppSetting />} />
        <Route path="/setting/dialogs-list" element={<DialogsList />} />
        <Route path="/setting/banners-list" element={<BannersList />} />
        <Route path="/tasks/task-category" element={<TaskCategory />} />
        <Route path="/tasks/task-list" element={<TasksList />} />
        <Route path="/user/user-list/edit-user/:userId" element={<EditUser />} />
        <Route path="/tasks/task-list/edit-task/:taskId" element={<EditTask />} />
        <Route path="/addon/plans/edit-plan/:planId" element={<EditPlan />} />
        <Route path="/news/edit-news/:newsId" element={<EditNews />} />
        <Route path="/setting/dialogs-list/edit-dialog/:dId" element={<EditDialog />} />
        <Route path="/setting/dialogs-list/add-dialog" element={<AddDialog />} />
        <Route path="/setting/banners-list/edit-banner/:bannerId" element={<EditBanners />} />
        <Route path='/tasks/task-list/add-task' element={<AddTask />} />
        <Route path='/addon/plans/add-plan' element={<AddPlan />} />
        <Route path='/news/add-news' element={<AddNews />} />
        <Route path='/setting/banners-list/add-banner' element={<AddBanner />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </>
  )
);

export default routes;
