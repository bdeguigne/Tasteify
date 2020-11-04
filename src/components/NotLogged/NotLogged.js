import React from 'react';
import "./NotLogged.css";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux";
import { authorizeUser } from '../../redux/actions/userActions';
import StyledButton from "../StyledButton";

function NotLogged(props) {
    if (props.isLogged) {
        return <Redirect to="/home" />
    }
    return (
        <div className="NotLogged-Container">
            <div className="NotLogged-Content">
                <h1 className="logo big"> Tasteify</h1>
                <StyledButton variant="outlined" size="large" color="secondary" onClick={() => props.authorizeUser()}>Log in with Spotify</StyledButton>
                <p style={{color: "#BFBFBF"}}>Made by Quentin Floricourt and Brice Deguigne</p>
            </div>
        </div>
    )
}

const actionCreators = {
    authorizeUser
}

function mapStateToProps(state) {
    return {
        isLogged: state.ui.isLogged
    }
}

const connectedNotLogged = connect(mapStateToProps, actionCreators)(NotLogged);

export default connectedNotLogged;