import React, {Component} from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'

import GoogleMap from 'google-map-react'
import { css } from 'emotion'
import axios from 'axios'

import addSpacesToNumber from './../../utils/addSpacesToNumber'

import DataPoint from './DataPoint'

const flexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const mainColumn = css`
    width: calc(70% - 1rem);
`;

const asideColumn = css`
    width: calc(30% - 1rem);
`;

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
            currentDataItem: null,
        }
    }

    componentWillMount() {
        this.setState({
            ranges: [1999, 2000, 2001],
            dataItems: [
                {
                    city: {
                        name: 'Tomks',
                        lon: 84.948179,
                        lat: 56.48466
                    },
                    radius: 50,
                    import: 1000000,
                    export: 1444444,
                },
                {
                    city: {
                        name: 'City N',
                        lon: 86.084787,
                        lat: 67.23976
                    },
                    radius: 10,
                    import: 23213,
                    export: 34234,
                }
            ]
        });
    }

    render() {
        const {dataItems, currentDataItem, currentYear} = this.state;

        return (
            <div className={flexRow}>
                <Card className={mainColumn}>
                    <CardMedia>
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
                                        onClick={() => this.setState({currentDataItem: dataItem})}
                                    />
                                )}
                            </GoogleMap>
                        </div>
                    </CardMedia>
                </Card>
                <Card className={asideColumn}>
                    <CardTitle
                        title={currentDataItem ? currentDataItem.city.name : 'Выберите регион'}
                        subtitle={'Данные'}
                    />
                    <CardText>
                        {currentDataItem &&
                            <div>
                                <p>Год: {currentYear}</p>
                                <p>Импорт: {addSpacesToNumber(currentDataItem.import)} $</p>
                                <p>Экспорт: {addSpacesToNumber(currentDataItem.export)} $</p>
                            </div>
                        }
                    </CardText>
                    <CardActions>
                        <FlatButton label={'Подробнее'} />
                    </CardActions>
                </Card>
            </div>
        )

    }
}
