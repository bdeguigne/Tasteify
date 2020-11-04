import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import './Genres.css'



const Graph = (props) => {
    const [gender, setgender] = useState([])
    const [percent, setpercent] = useState([])


    useEffect(() => {
        var tmpgenre = []
        var tmpourcent = []
        if (props.genre != null) {
            props.genre.forEach(line => {
                tmpgenre.push(line.genre)
                tmpourcent.push(line.count)
            });
            setgender(tmpgenre);
            setpercent(tmpourcent);
        }
    }, [props.genre])

    var options = {
        series: percent,
        chart: {
            width: 800,
            type: 'donut'
        },
        labels: gender,
        fill: {
            opacity: 1
        },

        yaxis: {
            show: false
        },
        legend: {
            position: 'right',
            labels: { colors: ['#fff'] },
            width: 180
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                }
            }
        },
        theme: {
            monochrome: {
                enabled: false,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    };

    return (
        <div style={{ paddingTop: "55px" , marginLeft: "20px", marginRight: "20px", marginBottom:"20px" }}>
            <h2 style={{ color: "white"}}>Top Genres</h2>
            <p>Based on the genres of your favorites artists</p>
            <div className="genres-container">
                <div className="row">
                    <div className="donut">
                        <Chart
                            options={options}
                            series={options.series}
                            type={options.chart.type}
                            width={options.chart.width}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        genre: state.spotifyData.topGenres
    }
}

const connectedGraph = connect(mapStateToProps)(Graph);
export default connectedGraph;