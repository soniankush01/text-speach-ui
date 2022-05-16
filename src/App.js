import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./Header/Navbar";
import NavbarNonSecure from "./Header/NavbarNonSecure";
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Home from "./Home/Home";
import Footer from "./Footer/Footer"
import AddDetails from "./AddDetails/AddDetails";
import SearchResults from "./SearchResults/SearchResults";
import Login from "./Login/Login";
import EditProfile from "./Editprofile/EditProfile"
import {getCookie} from "./Config/getCookie";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {



    render() {
        let sessionId = getCookie("isAuth");
        const headerComp = () => {
            if (sessionId) {
                return <div><Navbar/></div>
            } else {
                return <div><NavbarNonSecure/></div>
            }
        }
        return (
            <div className="App">
                {headerComp()}
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />}/>
                        <Route exact path="/addDetails" element={<AddDetails />}/>
                        <Route exact path="/employeeDetails" element={<SearchResults />}/>
                        <Route exact path="/userLogin" element={<Login />}/>
                        <Route exact path="/editProfile" element={<EditProfile />}/>
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        )
    };
}

export default App;
