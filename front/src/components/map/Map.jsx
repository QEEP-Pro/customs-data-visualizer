import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import GoogleMap from 'google-map-react'
import { css } from 'emotion'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Slider from 'material-ui/Slider'

import addSpacesToNumber from '../../utils/addSpacesToNumber'
import {fetchRange} from '../../utils/api'

import DataPoint from './DataPoint'


export default class Map extends Component {
    constructor() {
        super();

        this.state = {
            range: {
                start: (new Date()).getFullYear() - 1,
                end: (new Date()).getFullYear()
            },
            currentYear: (new Date()).getFullYear(),
            currentMetric: 'import',
            dataItems: [],
            currentCityId: 0,
        }
    }

    componentWillMount() {
        fetchRange().then(data => this.setState({
            range: {
                start: parseInt(data.min, 10),
                end: parseInt(data.max, 10),
            },
        }));

        this.setState({
            dataItems: [
                {
                    year: 2017,
                    city: {
                        id: 1,
                        name: 'Tomks',
                        lon: 84.948179,
                        lat: 56.48466
                    },
                    import: {
                        radius: 20,
                        amount: 123432234534,
                    },
                    export: {
                        radius: 50,
                        amount: 432454353423,
                    },
                },
                {   year: 2016,
                    city: {
                        id: 5,
                        name: 'City N',
                        lon: 86.084787,
                        lat: 67.23976
                    },
                    import: {
                        radius: 5,
                        amount: 12343223,
                    },
                    export: {
                        radius: 23,
                        amount: 432423,
                    },
                },
                {   year: 2017,
                    city: {
                        id: 5,
                        name: 'City N',
                        lon: 86.084787,
                        lat: 67.23976
                    },
                    import: {
                        radius: 10,
                        amount: 4002,
                    },
                    export: {
                        radius: 19,
                        amount: 432423,
                    },
                }
            ]
        });
    }

    render() {
        const {dataItems, currentCityId, currentYear, currentMetric} = this.state;

        const currentDataItem = dataItems
            .filter(item => item.year === currentYear)
            .find(dataItem => dataItem.city.id === currentCityId);

        return (
            <div className={flexRow}>
                <Card className={mainColumn}>
                    <CardMedia>
                        <div className={mapContainer}>
                            <GoogleMap
                                center={[67.239763, 86.084787]}
                                zoom={1}
                                onChildClick={(_, child) => this.setState({currentCityId: child.cityId})}
                            >
                                {dataItems.filter(item => item.year === currentYear).map((dataItem, index) =>
                                    <DataPoint
                                        key={index}
                                        lat={dataItem.city.lat}
                                        lng={dataItem.city.lon}
                                        radius={dataItem[currentMetric].radius}
                                        amount={dataItem[currentMetric].amount}
                                        cityId={dataItem.city.id}
                                        active={currentDataItem && dataItem.city.id === currentCityId}
                                        color={getMetricColor(currentMetric)}
                                    />
                                )}
                            </GoogleMap>
                        </div>
                    </CardMedia>
                </Card>
                <div className={asideColumn}>
                    <Card className={cardWithMargins}>
                        <CardText>
                            <div className={bottomFlexRow}>
                                <p>{this.state.range.start}</p>
                                <p className={largeText}>{currentYear}</p>
                                <p>{this.state.range.end}</p>
                            </div>

                            <div className={fullColumn}>
                                <Slider
                                    min={this.state.range.start}
                                    max={this.state.range.end}
                                    step={1}
                                    value={currentYear}
                                    onChange={ (event, value) => this.handleChangeYear(value) }
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
                        </CardText>
                    </Card>

                    <Card>
                        <CardTitle
                            title={currentDataItem ? currentDataItem.city.name : 'Выберите регион'}
                            subtitle={currentDataItem ? `Данные за ${currentYear} год` : null}
                        />
                        <CardText>
                            {currentDataItem &&
                                <div>
                                    <p>Импорт <span className={largeText}>{addSpacesToNumber(currentDataItem.import.amount)}</span> $</p>
                                    <p>Экспорт <span className={largeText}>{addSpacesToNumber(currentDataItem.export.amount)}</span> $</p>
                                </div>
                            }
                        </CardText>
                        <CardActions>
                            {currentDataItem &&
                                <Link to={`/detail/${currentCityId}`}>Подробнее</Link>
                            }
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }

    handleChangeYear = (year) => {
        // TODO: fetch new data and save
        this.setState({currentYear: year})
    }
}

const getMetricColor = (metric) => ({
    import: '#9fa8da',
    export: '#ffe082'
}[metric]);

const flexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const bottomFlexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
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

const largeText = css`
    font-size: 1.2rem;
`;
