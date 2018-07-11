import React from 'react'
import AdminManager from "../Admin/AdminManager";
import Header from "./Header";

class Layout extends React.Component
{
    render(){
        return(
            <div className="container">
                <Header/>
                <AdminManager/>
            </div>
        )
    }
}
export default Layout;