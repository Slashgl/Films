import React from "react";
import './index.css';
import 'antd/dist/antd.css'
import { Alert } from 'antd';


const ErrorIndicator = () => {
    return (
        <>
            <div className='error'>
                <Alert  message="Something went wrong" type="error" showIcon />
            </div>
        </>
    )
}
export default ErrorIndicator
