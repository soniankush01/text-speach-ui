import React from 'react';
import './SucessModal.css'
class SucessModal extends React.Component {

    render() {
        const {onClose} = this.props;
        const {msg} = this.props;
        return (
            <div className="sucess-modal">
                <div className="form-row">
                    <div className="col-md-12 sucess-message-text">
                        {msg}
                        <i className="fa fa-check" aria-hidden="true" style={{"color":"green"}}></i>
                    </div>
                    <div className="col-md12">
                        <button className="sucess-close-button" onClick={() => onClose()}>Close</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default SucessModal