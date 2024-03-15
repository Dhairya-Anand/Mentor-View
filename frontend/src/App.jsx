import React from "react";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import Home from "./pages/home/home";
import HomeRoute from "./pages/Home.route";
import { Toaster } from "react-hot-toast";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element ={< HomeRoute />} />
                <Route path="/home/*" element ={< HomeRoute />} />
            </Routes>
            <Toaster />
        </Router>
    )
}

export default App;