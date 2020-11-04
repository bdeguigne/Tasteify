import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavBar from '../navbar';
import SubNav from '../subnav';
import BasicTable from '../tabtracks';
import Graph from '../Genres';
import "./HomePage.css"

function HomePage() {
    return (
        <div>
            <AppBar elevation={1} style={{ background: '#0d0d0d', position: "fixed" }} position="static">
                <Toolbar>
                    <NavBar></NavBar>
                </Toolbar>
                <SubNav></SubNav>
            </AppBar>
            <BasicTable></BasicTable>
            <Graph></Graph>
        </div>
    )
}

export default HomePage;

