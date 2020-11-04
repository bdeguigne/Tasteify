import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import "./tabtracks.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#181717',
    color: theme.palette.common.white,
    borderBottom: "1px solid rgb(42, 36, 36)",
  },
  body: {
    color: 'white',
    fontSize: 14,
    borderBottom: "1px solid rgb(42, 36, 36)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    transition: "background-color 0.3s ease",
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: "#0d0d0d",
    }
  },
}))(TableRow);

function createData(img, nb, name, artist) {
  return { img, nb, name, artist };
}


const useStyles = makeStyles({
  table: {
    background: "#181717",
    minWidth: 700,
    paddingTop: 0,
  },
  title: {
    color: "white",
    marginBottom: 16
  }
});

function CustomizedTables(props) {
  const classes = useStyles();

  const [rows, setrows] = useState([])

  useEffect(() => {
    var tmp = []
    if (props.jsdata != null) {
      props.jsdata.forEach(line => {
        tmp.push(createData(line.albumCoverURL, line.position, line.trackName, line.artistName));
      });
      setrows(tmp);
    }
  }, [props.jsdata])

  // const rows = [
  //   createData(props.jsdata[0].albumCoverURL, '1', 'Track 1', 'Artist 1'),
  // ];

  return (
    <div style={{ paddingTop: "160px", marginLeft: "24px", marginRight: "24px" }}>
      <h2>Top Tracks</h2>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="customized table">
          <TableHead className="table-head">
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell>Track</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell className="table-img" align="left" ><img src={row.img} alt="" /></StyledTableCell>
                <StyledTableCell align="center" >{row.nb}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell className="table-artist">{row.artist}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function mapStateToProps(state) {
  if (state.spotifyData.topTracks == null) {
    return { jsdata: [] }
  }
  else {
    console.log(state.spotifyData.topTracks);
    return { jsdata: state.spotifyData.topTracks }
  }
}

const connectedCustomizedTables = connect(mapStateToProps)(CustomizedTables);

export default connectedCustomizedTables
