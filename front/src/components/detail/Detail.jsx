import React, {Component} from 'react'

import { css } from 'emotion'

import {Card, CardMedia, CardTitle} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

import {Line} from 'react-chartjs-2'

import {fetchDataItem} from '../../utils/api'


export default class Detail extends Component {

    constructor() {
        super();

        this.state = {
            fetched: false,
            activeCategory: null,
            data: [],
        }
    }

    componentWillMount() {
        fetchDataItem(this.props.match.params.id).then(data =>
            this.setState({
                fetched: true,
                data,
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

        console.log(this.state.fetched ? this.state.data.data : null)

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
                    data: getImportData(props.data),
                    borderColor: 'rgba(159, 168, 218, 1)',
                    backgroundColor: 'rgba(159, 168, 218, 0.3)',
                },
                {
                    label: 'Экспорт',
                    data: getExportData(props.data),
                    borderColor: 'rgba(255, 224, 130, 1)',
                    backgroundColor: 'rgba(255, 224, 130, 0.3)',
                }
            ]
        }}
        options={getLineChartOptions()}
    />
);

const getImportData = (data) => {
    return Object.keys(data).filter(item => !isNaN(parseInt(item)) ).map( (key, index) => ({
        x: key,
        y: data[key].import.amount,
    }));
};

const getExportData = (data) => {
    return Object.keys(data).filter(item => !isNaN(parseInt(item)) ).map( (key, index) => ({
        x: key,
        y: data[key].export.amount,
    }));
};

const getLineChartOptions = () => ({
    layout: { padding: {left: 20, right: 20, top: 20, bottom: 20} },
});
