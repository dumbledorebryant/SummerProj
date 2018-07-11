import React from 'react'
import {PageHeader} from "react-bootstrap";

class Header extends React.Component
{
    render(){
        return(
            <div>
                <PageHeader>
                    Eat or Not
                    <br/>
                    <small>The Best or Nothing</small>
                </PageHeader>
            </div>
        )
    }
}
export default Header;