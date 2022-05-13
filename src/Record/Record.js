import React from 'react';
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        }
    }

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

            }).catch((e) => console.log(e));
    };


    render() {
        return (
            <div>
                <button onClick={this.start} disabled={this.state.isRecording}>
                    Record
                </button>
                <button onClick={this.stop} disabled={!this.state.isRecording}>
                    Stop
                </button>
                <audio src={this.state.blobURL} controls="controls" />
                <div className="login-heading">
                    Sign in to Manage your profile.
                </div>
                <form className="form-data-login">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>User Email</label>
                            <input type="text" name="login" className="form-control" id="inputEmail4"
                                   placeholder="User Email Id" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>User Password</label>
                            <input type="password" name="password" className="form-control" id="inputEmail4"
                                   placeholder="password" onChange={this.handleChange}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}