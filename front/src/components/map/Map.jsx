import React, {Component} from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton'
import Slider from 'material-ui/Slider';

import GoogleMap from 'google-map-react'
import { css } from 'emotion'
import axios from 'axios'

import addSpacesToNumber from './../../utils/addSpacesToNumber'

import DataPoint from './DataPoint'


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
            ranges: {
                start: 1999,
                end: (new Date()).getFullYear(),
            },
            dataItems: [
                {
                    city: {
                        name: 'Tomks',
                        lon: 84.948179,
                        lat: 56.48466
                    },
                    import: {
                        radius: 30,
                        amount: 123432234534,
                    },
                    export: {
                        radius: 50,
                        amount: 432454353423,
                    },
                },
                {
                    city: {
                        name: 'City N',
                        lon: 86.084787,
                        lat: 67.23976
                    },
                    import: {
                        radius: 10,
                        amount: 12343223,
                    },
                    export: {
                        radius: 23,
                        amount: 432423,
                    },
                }
            ]
        });
    }

    render() {
        const {dataItems, currentDataItem, currentYear, currentMetric} = this.state;

        return (
            <div className={flexRow}>
                <Card className={mainColumn}>
                    <CardMedia>
                        <div className={mapContainer}>
                            <GoogleMap
                                center={[67.239763, 86.084787]}
                                zoom={1}
                            >
                                {dataItems && dataItems.map((dataItem, index) =>
                                    <DataPoint
                                        key={index}
                                        lat={dataItem.city.lat}
                                        lng={dataItem.city.lon}
                                        radius={dataItem[currentMetric].radius}
                                        amount={dataItem[currentMetric].amount}
                                        onClick={() => this.setState({currentDataItem: dataItem})}
                                    />
                                )}
                            </GoogleMap>
                        </div>
                    </CardMedia>
                </Card>
                <div className={asideColumn}>
                    <Card className={cardWithMargins}>
                        <CardActions>
                            <div className={flexRow}>
                                <p>{this.state.ranges.start}</p>
                                <p>{currentYear}</p>
                                <p>{this.state.ranges.end}</p>
                            </div>

                            <div className={fullColumn}>
                                <Slider
                                    min={this.state.ranges.start}
                                    max={this.state.ranges.end}
                                    step={1}
                                    value={currentYear}
                                    onChange={ (event, value) => this.setState({currentYear: value}) }
                                />
                            </div>

                            <RadioButtonGroup
                                name="metrics"
                                defaultSelected={this.state.currentMetric}
                                onChange={(event, value) => this.setState({currentMetric: value})}
                            >
                                <RadioButton value="import" label="Импорт" />
                                <RadioButton value="export" label="Экспорт" />
                            </RadioButtonGroup>
                        </CardActions>
                    </Card>

                    <Card>
                        <CardTitle
                            title={currentDataItem ? currentDataItem.city.name : 'Выберите регион'}
                            subtitle={'Данные'}
                        />
                        <CardText>
                            {currentDataItem &&
                                <div>
                                    <p>Импорт: {addSpacesToNumber(currentDataItem.import.amount)} $</p>
                                    <p>Экспорт: {addSpacesToNumber(currentDataItem.export.amount)} $</p>
                                </div>
                            }

                        </CardText>
                        <CardActions>
                            {currentDataItem &&
                                <FlatButton label={'Подробнее'}/>
                            }
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

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

const fullColumn = css`
    width: 100%;
`;

const mapContainer = css`
    height: ${window.innerWidth * 0.4}px;
`;

const cardWithMargins = css`
    margin-bottom: 2rem;
`;
