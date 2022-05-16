import React from 'react';
import axios, { post } from 'axios';
import {getCookie} from "../Config/getCookie";
import SucessModal from "../Modal/SucessModal/SucessModal";
import './AddDetails.css'
import MicRecorder from 'mic-recorder-to-mp3';
import {java_app_url} from "../Config/Url";
import {python_app_url} from "../Config/Url";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AddDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            isRecording: false,
            blobURL:'',
            audioFile: null,
            isBlocked: false,
            firstName:'',
            lastName:'',
            preferredName:'',
            emailId:'',
            uid:'',
            employeeId:'',
            showSucessModal:false,
            country:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDropDown = this.handleChangeDropDown.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    handleChangeDropDown(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.textGoogleApi(this.state.preferredName, this.state.uid, e.target.value)
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                this.setState({ blobURL, isRecording: false });
                this.setState({audioFile : blob})
            }).catch((e) => console.log(e));
    };

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
        this.loadEmployeeDetails();
    }

    loadEmployeeDetails = () => {
        var empId = getCookie("empId");
        let url = java_app_url.concat('employee/').concat(empId);
        axios.get(url, {
            headers: {
            }
        }).then((response) => {
            var preferredName;
            if (response.data.preferredName == "") {
                preferredName = response.data.firstName;
            } else {
                preferredName = response.data.preferredName
            }
            this.setState({firstName: response.data.firstName, lastName: response.data.lastName,
                preferredName: preferredName, uid: response.data.uid, email: response.data.email,
                employeeId: response.data.employeeId, country: response.data.country
            })
            this.textGoogleApi(preferredName, response.data.uid, "English (India)");
        }, (error) => {
            console.log("failure");
            console.log(error);
        });

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobileno"] !== "undefined") {
            if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    textGoogleApi = (name, uid, country) => {
        axios({
            method: 'post',
            url: python_app_url.concat('t2s_v1'),
            responseType: 'blob',
            data: {
                "preferredName":name,
                "uid":uid,
                "country": country
            }
        }).then((response) => {
            const blobResponseURL = URL.createObjectURL(response.data)
            this.setState({blobURL: blobResponseURL})
            this.setState({audioFile: response.data})
        });
    }

    pushRecord = () => {
        const dataObject = JSON.stringify(
            {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "preferredName" : this.state.preferredName,
                "email": this.state.email,
                "uid": this.state.uid,
                "employeeId" : this.state.employeeId,
                "country": this.state.country
            }
        )
        const url = java_app_url.concat('user/uploadRecord');
        const formData = new FormData();
        formData.append('file',this.state.audioFile)
        formData.append('employeeData', dataObject)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const resp =  post(url, formData,config)
        resp.then((response) => {
            this.setState({showSucessModal: true})
            this.setState({phonetics: response.data})
        }, (error) => {
            console.log("failure");
            console.log(error);
        });
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showSucessModal: !prevState.showSucessModal
        }));
    };

    render() {
        const {showSucessModal} = this.state
        return (
            <div className="add-details-content">
                <h3>Create Your Voice Print</h3>
                <div className="add-details-form">
                    <form className="form-data">
                        <div className="row mb">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                <div className="add-form-label">Legal First Name</div></label>
                            <div className="col-sm-6">
                                <input type="text" name="firstName" className="form-control" id="inputEmail4"
                                       placeholder="Legal First Name" onChange={this.handleChange}
                                       value={this.state.firstName}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    <div className="add-form-label">Legal Last Name</div></label>
                                <div className="col-sm-6">
                                <input type="text" name="lastName" className="form-control" id="inputEmail4"
                                       placeholder="Legal Last Name" onChange={this.handleChange}
                                       value={this.state.lastName}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                <div className="add-form-label">Preferred Name</div></label>
                            <div className="col-sm-6">
                                <input type="text" name="preferredName" className="form-control" id="inputEmail4"
                                       placeholder="Preferred Name" onChange={this.handleChange}
                                       value={this.state.preferredName}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    <div className="add-form-label">Email</div></label>
                            <div className="col-sm-6">
                                <input type="text" name="email" className="form-control" id="inputEmail4"
                                       placeholder="Email" disabled onChange={this.handleChange}
                                       value={this.state.email}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    <div className="add-form-label">UId</div></label>
                            <div className="col-sm-6">
                                <input type="text" name="uid" className="form-control" id="inputEmail4"
                                       placeholder="Uid" disabled onChange={this.handleChange}
                                       value={this.state.uid}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    <div className="add-form-label">Employee Id</div></label>
                            <div className="col-sm-6">
                                <input type="text" name="employeeId" className="form-control" id="inputEmail4"
                                       placeholder="Employee Id" disabled onChange={this.handleChange}
                                       value={this.state.employeeId}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row mb">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    <div className="add-form-label">Country</div></label>
                            <div className="col-sm-6">
                                <select name="country" value={this.state.country} onChange={this.handleChangeDropDown}>
                                    <option value="English (India)">English (India)</option>
                                    <option value="English (United States)">English (United States)</option>
                                    <option value="Hindi (India)">Hindi (India)</option>
                                    <option value="Bengali (India)">Bengali (India)</option>
                                    <option value="Finnish (Finland)">Finnish (Finland)</option>
                                </select>
                            </div>
                            </div>
                        </div>

                    </form>
                    {showSucessModal && <SucessModal onClose={this.toggleModal}
                                                     msg="Record Upload Sucessfull"/>}
                    <div className="form-row">
                        <div className="record-actions">
                            <audio src={this.state.blobURL} controls="controls" />
                            <div className="default-Audio-text">
                                By Default we load Standard name pronounciation of First Name/Preferred Name,
                                If you wish to override default, please record your own audio and submit
                            </div>
                            <h5>Record you name:</h5>
                            <button  className="action-button" onClick={this.start} disabled={this.state.isRecording}>
                                Record
                            </button>
                            <button  className="action-button" onClick={this.stop} disabled={!this.state.isRecording}>
                                Stop
                            </button>
                        </div>
                    </div>
                    <div className="form-row">
                        <button className="submit-button" onClick={this.pushRecord}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddDetails
