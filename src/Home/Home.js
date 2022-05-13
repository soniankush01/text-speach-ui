import React from 'react';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import img1 from "../recorder-ready-balloons.svg"

class Home extends React.Component {

    render() {
        const loginIconStyle = {
            color: "black",
            size: 100,
        };
        return (
           <div>
               <div className="home-search">
                   <div className="home-search-title">
                       Welcome to Employee Record Portal
                   </div>
                   <div className="home-search-subtitle">
                        Search for employee
                   </div>
                   <form className="home-search-form">
                       <input type="text" className="home-search-box" name="name" placeholder="By Uid | Email Id | Employee ID"/>
                       <button className="home-search-button">
                           <i className="fa fa-search fa-lg" aria-hidden="true">
                           </i>
                       </button>
                   </form>
               </div>
               <div id="A">
               </div>

               <div id="B" className="wavy"></div>
               <div className="home-add-voice">
                   <div className="row">
                   </div>
                       <div className="row">
                           <div className="col-10">
                                   <div className="home-text-content">
                                        <h2>How it Works</h2>
                                       <div className="row">
                                           <div className="col-3 icon-details">
                                               <i className="fa fa-sign-in" style={loginIconStyle} aria-hidden="true"></i>
                                               <div className="row">
                                                   <div className="col-12 small-text">
                                                       Sign In to portal
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="col-3 icon-details">
                                               <i className="fa fa-microphone" style={loginIconStyle} aria-hidden="true"></i>
                                               <div className="row">
                                                   <div className="col-12 small-text">
                                                       Record/Approve voice print
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="col-3 icon-details">
                                               <i className="fa fa-upload" style={loginIconStyle} aria-hidden="true"></i>
                                               <div className="row">
                                                   <div className="col-12 small-text">
                                                       Submit Voice Print
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="col-3 icon-details">
                                               <i className="fa fa-share-alt" style={loginIconStyle} aria-hidden="true"></i>
                                               <div className="row">
                                                   <div className="col-12 small-text">
                                                       Shared Across
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                       </div>
                   <div className="row">
                           <div className="col-12">
                               <img src={img1} className="record-section-img"/>
                           </div>
                       </div>
                   <div className="row">
                       <div className="col">
                           <button className="record-button">Record</button>
                       </div>
                   </div>

               </div>
           </div>
        )
    }
}

export default Home