import React, {Component} from 'react'

import { css } from 'emotion'

import {Card, CardMedia, CardTitle} from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs'
import {List, ListItem} from 'material-ui/List'

import {Line, Pie} from 'react-chartjs-2'


import {fetchDataItem,fetchRange} from '../../utils/api'

const _ = require('lodash');


export default class Detail extends Component {

    constructor() {
        super();

        this.state = {
            fetched: false,
            activeCategory: null,
            data: [],
            years: [],
        }
    }

    componentWillMount() {
        fetchDataItem(this.props.match.params.id).then(data =>
            this.setState({
                fetched: true,
                data,
            })
        );

        fetchRange().then(data =>
            this.setState({
                years: _.range(data.min, data.max),
            })
        );
    }

    render() {
        const cityName = this.props.match.params.name;

        const categories = this.state.fetched ? (
            <div>
                {this.state.data.menu.map((category, index) =>
                    <ListItem
                        key={index}
                        primaryText={category.name}
                        onClick={() => this.setState({activeCategory: category})}
                    />
                )}
            </div>
        ) : false;

        const lineChart = this.state.fetched ? (
            !this.state.activeCategory
                ? <LineChart data={this.state.data.totals} />
                : <LineChart data={this.state.data.data[this.state.activeCategory.uid]} />
        ) : false;

        return (
            <div className={flexRow}>
                <Card className={menuColumn}>
                    <CardTitle title={cityName} subtitle={'Товары'} />
                    <List>
                        {categories}
                    </List>
                </Card>
                <div className={mainColumn}>
                    <Card>
                        {this.state.activeCategory && <CardTitle title={this.state.activeCategory.name}/>}
                        <CardMedia>
                            {lineChart}
                        </CardMedia>
                    </Card>
                    <br/>
                    <Card>
                        <CardTitle title={'Экспорт по странам'}/>
                        <Tabs>
                            {this.state.years.map( (year, index) =>
                                <Tab label={year}>
                                    {(!this.state.activeCategory && this.state.fetched) &&
                                        <PieChart
                                            data={this.state.data.totals[year].countries}
                                            callback={getExportDataForPie}
                                        />
                                    }
                                </Tab>
                            )}
                        </Tabs>
                    </Card>
                    <br />
                    <Card>
                        <CardTitle title={'Импорт по странам'}/>
                        <Tabs>
                            {this.state.years.map((year, index) =>
                                <Tab label={year}>
                                    {(!this.state.activeCategory && this.state.fetched) &&
                                    <PieChart
                                        data={this.state.data.totals[year].countries}
                                        callback={getImportDataForPie}
                                    />
                                    }
                                </Tab>
                            )}
                        </Tabs>
                    </Card>
                </div>
            </div>
        )
    }
}

const flexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const menuColumn = css`
    width: calc(30% - 1rem);
`;

const mainColumn = css`
    width: calc(70% - 1rem);
`;

const LineChart = (props) => (
    <Line
        data={{
            datasets: [
                {
                    label: 'Импорт',
                    data: getImportDataForLine(props.data),
                    borderColor: 'rgba(159, 168, 218, 1)',
                    backgroundColor: 'rgba(159, 168, 218, 0.3)',
                },
                {
                    label: 'Экспорт',
                    data: getExportDataForLine(props.data),
                    borderColor: 'rgba(255, 224, 130, 1)',
                    backgroundColor: 'rgba(255, 224, 130, 0.3)',
                }
            ]
        }}
        options={getLineChartOptions()}
    />
);

const PieChart = (props) => (
    <Pie
        data={{
            datasets: [{
                data: props.callback(props.data),
                backgroundColor: [ "#4bb2c5 ", "#EAA228 ", "#c5b47f ", "#579575 ", "#839557 ", "#958c12 ", "#953579 ", "#4b5de4 ", "#d8b83f ", "#ff5800 ", "#0085cc ", "#c747a3 ", "#cddf54 ", "#FBD178 ", "#26B4E3 ", "#bd70c7 "]
            }],
            labels: getLabelsForPieChart(props.data),
        }}
    >
    </Pie>
);

const getImportDataForLine = (data) => {
    return Object.keys(data).filter(item => !isNaN(parseInt(item)) ).map( (key, index) => ({
        x: key,
        y: data[key].import.amount,
    }));
};

const getExportDataForLine = (data) => {
    return Object.keys(data).filter(item => !isNaN(parseInt(item)) ).map( (key, index) => ({
        x: key,
        y: data[key].export.amount,
    }));
};

const getExportDataForPie = (data) =>
    Object.keys(data).map( (key, index) => {
        return data[key].export.amount > 57667441 ? data[key].export.amount : null
    });

const getImportDataForPie = (data) =>
    Object.keys(data).map( (key, index) => {
        return data[key].export.amount > 57667441 ? data[key].import.amount : null
    });

const getLabelsForPieChart = (data) =>
    Object.keys(data).filter(key => data[key].export.amount > 57667441 ? data[key].export.amount : null);


const getLineChartOptions = () => ({
    layout: { padding: {left: 20, right: 20, top: 20, bottom: 20} },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Год'
            }
        }]
    }
});
