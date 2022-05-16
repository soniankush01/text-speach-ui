import React from 'react';
import './EditProfile.css'
import {getCookie} from "../Config/getCookie";
import axios from "axios";
import {java_app_url} from "../Config/Url";
import SucessModal from "../Modal/SucessModal/SucessModal";

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            checked: true,
            email:'',
            uid:'',
            employeeId:'',
            preferredName:'',
            showSucessModal: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeCheckBox = () => {
        this.setState(prevState => ({
            checked: !prevState.checked
        }));
    };

    componentDidMount() {
       this.loadEmployeeDetails();
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showSucessModal: !prevState.showSucessModal
        }));
    };

    loadEmployeeDetails = () => {
        var empId = getCookie("empId");
        let url = java_app_url.concat('employee/').concat(empId);
        axios.get(url, {
            headers: {
            }
        }).then((response) => {
            this.setState({firstName: response.data.firstName, lastName: response.data.lastName,
                preferredName: response.data.preferredName, uid: response.data.uid, email: response.data.email,
                employeeId: response.data.employeeId, checked: response.data.optIn
            })
            this.textGoogleApi(response.data.firstName, response.data.preferredName);
        }, (error) => {
            console.log("failure");
            console.log(error);
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    updateUserProfile = () => {
        var status = this.state.checked
        axios({
            method: 'put', //you can set what request you want to be
            url: java_app_url.concat('user/updateOptIn?employeeId=').concat(this.state.employeeId),
            headers: {
                optIn: status
            }
        }).then((response) => {
            this.setState({showSucessModal: true})
        }, (error) => {
            console.log("failure");
            console.log(error);
        });
    }


    render() {
        return (
            <div className="edit-profile">
                <div class="container rounded bg-white mt-5 mb-5">
                    <div class="row">
                        <div class="col-md-3 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img
                                class="rounded-circle mt-5" width="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span
                                class="font-weight-bold">{this.state.employeeId}</span><span
                                class="text-black-50">{this.state.email}</span><span> </span></div>
                        </div>
                        <div class="col-md-5 border-right">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h4 class="text-right profile-edit-heading">Update Profile</h4>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6"><label class="labels">Legal First Name</label>
                                        <input type="text" class="form-control" name="firstName" disabled onChange={this.handleChange} placeholder="first name"  value={this.state.firstName}/></div>
                                    <div class="col-md-6"><label class="labels">Legal Last Name</label>
                                        <input type="text" class="form-control" name="lastName" disabled onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"><label class="labels">Uid</label>
                                        <input type="text" class="form-control" disabled name="uid" onChange={this.handleChange} placeholder="uId" value={this.state.uid}/>
                                    </div>
                                    <div className="col-md-6"><label className="labels">Preferred Name</label><input
                                        type="text" className="form-control" name="preferredName" disabled onChange={this.handleChange}  value={this.state.preferredName} placeholder="Preferred Name"/>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div className="col-md-12 opt-in-label">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={this.state.checked}
                                            onChange={this.handleChangeCheckBox}
                                        />
                                        Enable Voice print
                                        <div className="subtext-optin">
                                            (If Checked, other user can hear your name Pronunciation)
                                        </div>
                                    </label>
                                    </div>
                                </div>
                                {this.state.showSucessModal && <SucessModal onClose={this.toggleModal}
                                                                 msg="Voice Preferences updated"/>}
                                <div class="mt-5 text-center">
                                    <button onClick={this.updateUserProfile} class="btn btn-primary profile-button" type="button">Save Profile</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile