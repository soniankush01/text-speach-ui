import React from 'react';
import './UserNf.css'
import img from '../'

class UserNF extends React.Component {

    backToHome = () => {
        window.location = "/";
    }

    render() {
        return (
            <div className="User-nf-content">
                <div className="heading-nf">
                    User Not Found, Please Go Back to Home and Search with either of Uid, Employee Id or Email address.

                </div>
                <button className="back-toHome" onClick={this.backToHome}>Back To <i className="fa fa-home" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default UserNF