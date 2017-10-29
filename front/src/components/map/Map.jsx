import React, {Component} from 'react'

import { css } from 'emotion'


import {fetchRange, fetchDataList} from '../../utils/api'

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
        const year = this.state.currentYear;
        const oldDataItems = this.state.dataItems;

        fetchRange().then(data => this.setState({
            range: {
                start: parseInt(data.min, 10),
                end: parseInt(data.max, 10),
            },
        }));

        fetchDataList(year).then(data => this.setState({
            dataItems: oldDataItems.concat(
                data.map((item => ({
                    ...item,
                    year,
                })))
            )
        }));
    }

    render() {
        const {dataItems, currentCityId, currentYear, currentMetric} = this.state;

        if (dataItems.length === 0) {
            return false;
        }

        console.log(dataItems);

        const currentDataItem = dataItems
            .filter(item => item.year === currentYear)
            .find(dataItem => dataItem.city.uid === currentCityId);

        return (
            <div className={flexRow}>
                <div className={mainColumn}>
                    <GoogleMap
                        metric={currentMetric}
                        data={dataItems.filter(item => item.year === currentYear)}
                        currentDataItem={currentDataItem}
                        handleChildClick={ (_, child) => this.setState({currentCityId: child.cityId}) }
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


