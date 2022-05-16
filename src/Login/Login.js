import React from 'react';
import axios, { post } from 'axios';
import {java_app_url} from "../Config/Url";

import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            userName:'',
            showUserNotExist:false,
            showIncorrectPassword:false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    loginCheck = () => {
        console.log("New Login")
        this.setState({showUserNotExist: false, showIncorrectPassword:false})
        var validLogin=['111','222','333','444'];
        if (!validLogin.includes(this.state.userName)) {
            this.setState({showUserNotExist: true})
            return false;
        } else if(this.state.password != 'password') {
            this.setState({showIncorrectPassword: true})
            return false;
        }
        return true;
    }

    loginUser = () => {
        if (this.loginCheck()) {
            let url = java_app_url.concat('employee/').concat(this.state.userName);
            axios.get(url, {
                headers: {}
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
    }

    render() {

        const displayErrorMsg = () => {
            var errorMessage;
            if (this.state.showUserNotExist) {
                errorMessage = "User Not found in our Records.Please enter a valid User Name";
            } else if (this.state.showIncorrectPassword) {
                errorMessage = "Please Enter Correct password for User id-".concat(this.state.userName)
            }
            return errorMessage;
        }

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
                    <div className="row">
                        <div className="col-12">
                            <div className="incorrect-text">
                            {displayErrorMsg()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login