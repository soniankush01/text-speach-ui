import React from 'react';
import axios, {post} from 'axios';
import './SearchResults.css'
import MicRecorder from 'mic-recorder-to-mp3';
import ankush from '../ankush.jpg'

const Mp3Recorder = new MicRecorder({bitRate: 128});

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blobURL: '',
            audioFile: null,
            firstName: "Ankush",
            lastName: "Soni",
            prefferedName: "Ahaan",
            uid: "u793188",
            email: "ankush.soni@wellsfargo.com",
            employeeId: "1946731",
            phonetics: "Ae4j"
        }
    }

    componentDidMount() {
        axios({
            url: 'http://localhost:8080/getAudio',
            responseType: 'blob',
        }).then((response) => {
            const blobResponseURL = URL.createObjectURL(response.data)
            this.setState({blobURL: blobResponseURL})
        });

    }

    render() {
        return (
            <div className="search-results-page">
                <div className="row">
                    <div className="col-md-6">
                        <img src={ankush} className="img-responsive"/>
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
                <div className="row">
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
            </div>
        )
    }
}

export default SearchResults
