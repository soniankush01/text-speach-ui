import React from 'react';
import axios, { post } from 'axios';
import {java_app_url} from "../Config/Url";

import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            userName:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    loginUser = () => {
        let url = java_app_url.concat('employee/').concat(this.state.userName);
        axios.get(url, {
            headers: {
            }
        }).then((response) => {
             if (response.status == 200) {
                 document.cookie = "isAuth=true"
                 document.cookie = "empId=".concat(this.state.userName)
                 window.location = "/";
             }
         }, (error) => {
             console.log("failure");
             console.log(error);
         });
    }

    render() {
        return (
            <div className="login-modal">
                <div className="login-heading">
                    Sign in to Manage your Profile
                </div>
                <div className="form-data-login">
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="userName" className="form-control" id="inputEmail4"
                                   placeholder="Enter Employee Id" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="password" name="password" className="form-control" id="inputEmail4"
                                   placeholder="Enter Password" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button onClick={this.loginUser}> Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login