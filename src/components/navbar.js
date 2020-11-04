import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './navbar.css'
import StyledButton from "./StyledButton";

import { connect } from "react-redux";
import { setPageTitle } from "../redux/actions/uiActions";
import { disconnectUser } from "../redux/actions/userActions";

const NavBar = (props) => {
    return (
        <div className="navbar-container">
            <div><h1 className="logo">Tasteify</h1></div>
            <StyledButton className="button" variant="outlined" color="primary"
                startIcon={<Avatar src={props.userImage} />}
                onClick={() => props.disconnectUser()}>
                Disconnect
                        </StyledButton>
        </div>
    )
}

const actionCreators = {
    setPageTitle: setPageTitle,
    disconnectUser
}

function mapStateToProps(state) {
    var userImage = null;
    if (state.user.user && state.user.user.images[0]) {
        userImage = state.user.user.images[0].url
    }

    return {
        pageTitle: state.ui.pageTitle,
        userImage
    }
}

const connectedTopBar = connect(mapStateToProps, actionCreators)(NavBar);

// <h1 variant="title"
// style={{ color: '#1ed760' }}
// >
// Tasteify
// </h1>

export default connectedTopBar;