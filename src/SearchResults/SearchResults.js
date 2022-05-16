import React from 'react';
import axios, {post} from 'axios';
import './SearchResults.css'
import MicRecorder from 'mic-recorder-to-mp3';
import {java_app_url} from "../Config/Url";
import {apigee_url} from "../Config/Url";

const Mp3Recorder = new MicRecorder({bitRate: 128});

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blobURL: '',
            audioFile: null,
            firstName: "",
            lastName: "",
            prefferedName: "",
            uid: "",
            email: "",
            employeeId: "",
            phonetics: "",
            voiceAvaliable: false,
            country:''
        }
    }

    componentDidMount() {
        var searchterm = localStorage.getItem("serchTerm");
        axios({
            url: java_app_url.concat('user/getRecord/').concat(searchterm),
            responseType: 'blob',
        }).then((response) => {
                if (response.data.size != 0) {
                    this.setState({voiceAvaliable: true})
                    const blobResponseURL = URL.createObjectURL(response.data)
                    this.setState({blobURL: blobResponseURL, audioFile: response.data})
                }
                this.getEmployeeData(response.headers.empid)
        });
    }

    getEmployeeData = (empId) => {
        let url = java_app_url.concat('employee/').concat(empId);
        axios.get(url, {
            headers: {
            }
        }).then((response) => {
            this.setState({firstName: response.data.firstName, lastName: response.data.lastName,
                prefferedName: response.data.preferredName, uid: response.data.uid, email: response.data.email,
                employeeId: response.data.employeeId, country: response.data.country
            })
            this.getTranscript(response.data.uid, response.data.country)
        }, (error) => {
            console.log("failure");
            console.log(error);
        });
        }

    getTranscript = (uid, country) => {
        const dataObject = JSON.stringify(
            {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "preferredName" : this.state.preferredName,
                "email": this.state.emailId,
                "uid": uid,
                "employeeId" : this.state.employeeId,
                "country":country
            }
        )
        const url = apigee_url.concat('name-pronunciation/s2t');
        const formData = new FormData();
        formData.append('audio',this.state.audioFile)
        formData.append('request', dataObject)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const resp = post(url, formData,config)
        resp.then((response) => {
            this.setState({phonetics: response.data})
        }, (error) => {
            console.log("failure");
            console.log(error);
        });
    }

    backToHome = () => {
        window.location = "/";
    }

    render() {
        const renderVoicePrint = () => {
            if (this.state.voiceAvaliable) {
                return <div className="row">
                    <div className="col-md-6">
                        <div className="name-audio">
                            <h2>Name phonetics:</h2>
                            {this.state.phonetics}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="name-audio">
                            <h2>Name Audio:</h2>
                            <audio src={this.state.blobURL} controls="controls"/>
                        </div>
                    </div>
                </div>
            } else {
                return <div className="row">
                    <div className="col-md-12">
                        <div className="opt-out-message">
                            Name Audio not avaliable!!! User has opted out for Voice Print.
                        </div>
                    </div>
                </div>
            }
        }
        return (
            <div className="search-results-page">
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg   " className="img-responsive"/>
                    </div>
                    <div className="col-md-6">
                        <table className="table record-tab">
                            <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>Legal First Name</td>
                                <td>{this.state.firstName}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>Legal Last Name</td>
                                <td>{this.state.lastName}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>Preffered Name</td>
                                <td>{this.state.prefferedName}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>Email ID</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>Uid</td>
                                <td>{this.state.uid}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>Employee Id</td>
                                <td>{this.state.employeeId}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {renderVoicePrint()}
                <button className="back-toHome" onClick={this.backToHome}>Back To <i className="fa fa-home" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default SearchResults
