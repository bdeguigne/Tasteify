import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { getTopLastMonth, getTopLast6Month, getTopAllTime } from "../redux/actions/spotifyDataActions";

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#1ED760'
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    marginTop: '20px',
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      color: '#1ED760',
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: 0,
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#181717',
  },
}));

function SubNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (value === 0) {
      props.getTopLastMonth();
    }
    else if (value === 1) {
      props.getTopLast6Month();
    }
    else {
      props.getTopAllTime();
    }
  }, [value, props])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <Typography className={classes.padding} />
      </div>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Last Month" />
          <StyledTab label="Last 6 Months" />
          <StyledTab label="All Time" />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
    </div>
  );
}


const actionCreators = {
  getTopLastMonth,
  getTopLast6Month,
  getTopAllTime
}

function mapStateToProps(state) {
  return {}
}

const connectedSubNav = connect(mapStateToProps, actionCreators)(SubNav);

export default connectedSubNav