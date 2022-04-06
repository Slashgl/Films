import React from "react";
import './Informational-indicator.css';
import {Alert} from "antd";

const InformationalIndicator = () => {
    return(
        <div className='info'>
            <Alert message="The search no results" type="info" showIcon />
        </div>
    )
}

export default InformationalIndicator