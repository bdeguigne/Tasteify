import React, { useEffect } from 'react'
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"
import { getAccessToken } from '../redux/actions/userActions';

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    parser.href = url;
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = decodeURIComponent(split[1]);
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        params: searchObject,
        hash: parser.hash
    };
}

function Callback(props) {
    useEffect(() => {
        if (!props.user) {
            var url = parseURL(window.location.href);
            // alert(window.location.href);
            if (url.params.code) {
                props.getAccessToken(url.params.code);
            }
        }
    }, [props])

    if (props.isLogged) {
        return <Redirect to="/home" />
    } else {
        return <Redirect to="/login" />
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isLogged: state.ui.isLogged
    }
}

const actionCreators = {
    getAccessToken
}

const connectedCallback = connect(mapStateToProps, actionCreators)(Callback);

export default connectedCallback