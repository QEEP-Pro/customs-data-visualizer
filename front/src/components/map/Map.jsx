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
            regional: true,
            fetched: false,
            currentYear: (new Date()).getFullYear(),
            currentMetric: 'import',
            dataItems: [],
            currentCityId: 0,
        }
    }

    componentWillMount() {
        const year = this.state.currentYear;
        const regional = this.state.regional;

        fetchRange().then(data => this.setState({
            range: {
                start: parseInt(data.min, 10),
                end: parseInt(data.max, 10),
            },
        }));

        this.updateData(year, regional);
    }

    render() {
        const {dataItems, currentCityId, currentYear, currentMetric} = this.state;

        const data = this.state.fetched ? dataItems.filter(item => item.year === currentYear) : [];

        const currentDataItem = this.state.fetched ? data.find(dataItem => dataItem.city.uid === currentCityId) : null;

        return (
            <div className={flexRow}>
                <div className={mainColumn}>
                    <GoogleMap
                        metric={currentMetric}
                        data={data}
                        currentDataItem={currentDataItem}
                        handleChildClick={ (_, child) => this.setState({currentCityId: child.cityId}) }
                        currentCityId={currentCityId}
                    />
                </div>
                <div className={asideColumn}>
                    <YearPicker
                        range={this.state.range}
                        year={this.state.currentYear}
                        metric={this.state.currentMetric}
                        regional={this.state.regional}
                        handleChangeYear={this.handleChangeYear}
                        handleChangeMetric={ (value) => this.setState({currentMetric: value}) }
                        handleUpdateRegional={this.handleChangeRegional}
                    />

                    <CityShortInfo dataItem={currentDataItem} year={currentYear} />
                </div>
            </div>
        );
    }

    handleChangeYear = (year) => {
        const regional = this.state.regional;

        this.updateData(year, regional);

        this.setState({currentYear: year});
    };

    handleChangeRegional = (_, regional) => {
        const year = this.state.currentYear;

        this.updateData(year, regional);

        this.setState({regional: regional});
    };

    updateData = (year, regional) => {
        this.setState({ fetched: false });

        fetchDataList(year, regional).then(data => this.setState({
            fetched: true,
            dataItems: data.map((item => ({
                ...item,
                year,
            })))
        }));
    };
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


