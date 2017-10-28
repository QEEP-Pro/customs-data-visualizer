import React, {Component} from 'react'

import axios from 'axios'

import GoogleMap from 'google-map-react'
import { css } from 'emotion'

import DataPoint from './DataPoint'


const mapContainer = css`
    height: ${window.innerWidth * 0.4}px;
`;

export default class Map extends Component {
    constructor() {
        super();

        this.state = {
            ranges: [(new Date()).getFullYear()],
            currentYear: (new Date()).getFullYear(),
            currentMetric: 'import',
            dataItems: [],
        }
    }

    componentWillMount() {
        this.setState({
            ranges: [1999, 2000, 2001],
            dataItems: [
                {
                    city: {
                        lon: 84.948179,
                        lat: 56.48466
                    },
                    radius: 50,
                    amount: 1000000
                },
                {
                    city: {
                        lon: 86.084787,
                        lat: 67.23976
                    },
                    radius: 10,
                    amount: 1000000
                }
            ]
        });
    }

    render() {
        const dataItems = this.state.dataItems;

        return (
            <div className={mapContainer}>
                <GoogleMap
                    center={[67.239763, 86.084787]}
                    zoom={3}
                >
                    {dataItems && dataItems.map((dataItem, index) =>
                        <DataPoint
                            key={index}
                            lat={dataItem.city.lat}
                            lng={dataItem.city.lon}
                            radius={dataItem.radius}
                            amount={dataItem.amount}
                        />
                    )}
                </GoogleMap>
            </div>
        )

    }
}
