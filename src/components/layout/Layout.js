import React from 'react'
import Sidebar from './Sidebar'

const Layout = (props) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-2 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
