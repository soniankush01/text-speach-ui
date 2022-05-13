import React from 'react';
import axios, { post } from 'axios';

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
        axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: {
                "username": this.state.userName,
                "password": this.state.password
            }
        }).then((response) => {
            if (response.status == 200) {
                document.cookie = "isAuth=true"
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
                                   placeholder="Enter Username/Email" onChange={this.handleChange}/>
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