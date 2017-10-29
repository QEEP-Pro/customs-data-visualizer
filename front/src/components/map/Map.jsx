import React, {Component} from 'react'

import { css } from 'emotion'


import {fetchRange} from '../../utils/api'

import CityShortInfo from './CityShortInfo'
import YearPicker from './YearPicker'
import GoogleMap from './GoogleMap'


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
                <div className={mainColumn}>
                    <GoogleMap
                        metric={currentMetric}
                        data={dataItems.filter(item => item.year === currentYear)}
                        currentDataItem={currentDataItem}

                        handleChildClick={(_, child) => this.setState({currentCityId: child.cityId})}
                    />
                </div>
                <div className={asideColumn}>
                    <YearPicker
                        range={this.state.range}
                        year={this.state.currentYear}
                        metric={this.state.currentMetric}
                        handleChangeYear={this.handleChangeYear}
                        handleChangeMetric={ (value) => this.setState({currentMetric: value}) }
                    />

                    <CityShortInfo dataItem={currentDataItem} year={currentYear} />
                </div>
            </div>
        );
    }

    handleChangeYear = (year) => {
        // TODO: fetch new data and save
        this.setState({currentYear: year})
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


