import React from 'react';
import axios, { post } from 'axios';
import './AddDetails.css'
import MicRecorder from 'mic-recorder-to-mp3';

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
            employeeId:''
        }
        this.handleChange = this.handleChange.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });

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
        this.textGoogleApi();
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

    textGoogleApi = () => {
        axios({
            method: 'post',
            url: 'https://name-pronunciation-jnlwkiahlq-uc.a.run.app/t2s',
            responseType: 'blob',
            data: {
                "preferredName":"Ahaan Soni",
                "uid":"u123456"
            }
        }).then((response) => {
            const blobResponseURL = URL.createObjectURL(response.data)
            this.setState({blobURL: blobResponseURL})
        });
    }

    pushRecord = () => {
        alert(this.state.firstName)
        const dataObject = JSON.stringify(
            {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "preferredName" : this.state.preferredName,
                "email": this.state.emailId,
                "uid": this.state.uid,
                "employeeId" : this.state.employeeId
            }
        )
        const url = 'http://localhost:8080/voice/upload';
        const formData = new FormData();
        formData.append('file',this.state.audioFile)
        formData.append('employeeData', dataObject)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }


    render() {
        return (
            <div className="add-details-content">
                <h3>Create Your Voice Print</h3>
                <div className="add-details-form">
                    <form className="form-data">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="firstName" className="form-control" id="inputEmail4"
                                       placeholder="First Name" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="lastName" className="form-control" id="inputEmail4"
                                       placeholder="Last Name" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="preferredName" className="form-control" id="inputEmail4"
                                       placeholder="Preferred Name" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="emailId" className="form-control" id="inputEmail4"
                                       placeholder="Email" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="uid" className="form-control" id="inputEmail4"
                                       placeholder="Uid" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="employeeId" className="form-control" id="inputEmail4"
                                       placeholder="Employee Id" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" name="selectedCountry" className="form-control" id="inputEmail4"
                                       placeholder="Country" onChange={this.handleChange}/>
                            </div>
                        </div>

                    </form>
                    <div className="form-row">
                        <div className="record-actions">
                            <h5>Record you name:</h5>
                            <button  className="action-button" onClick={this.start} disabled={this.state.isRecording}>
                                Record
                            </button>
                            <button  className="action-button" onClick={this.stop} disabled={!this.state.isRecording}>
                                Stop
                            </button>
                            <audio src={this.state.blobURL} controls="controls" />
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
