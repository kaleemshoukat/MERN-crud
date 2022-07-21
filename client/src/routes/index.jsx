import React from "react";
import { Route } from "react-router-dom";
//layouts
import AuthLayout from "../components/layouts/AuthLayout";
import AppLayout from "../components/layouts/AppLayout";
//components
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import AddPost from "../pages/AddPost";
import EditPost from "../pages/EditPost";
import Users from "../pages/Users";
import Page404 from "../components/errors/Page404";

const authRoutes = [
    <Route element={<AuthLayout />} >
        <Route exact path="/" element={ <Login /> } />
        <Route path="*" element={ <Page404 /> } />
    </Route>
]

const appRoutes = [
    <Route element={<AppLayout />}>
        <Route exact path="/posts" element={ <Posts /> } />
        <Route exact path="/add" element={ <AddPost /> } />
        <Route exact path="/edit/:id" element={ <EditPost /> } />
        <Route exact path="/users" element={ <Users /> } />
    </Route>
]

export { authRoutes, appRoutes };