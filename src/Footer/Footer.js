import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="left-content-footer">Copyright @2022</div>
                        </div>
                        <div className="col-sm-10">
                            <div className="left-content-footer">
                                Privacy Policy | Tearms of Use | Contact Us
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer