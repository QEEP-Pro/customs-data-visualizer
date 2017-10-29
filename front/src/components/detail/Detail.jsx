import React, {Component} from 'react'

import { css } from 'emotion'

import {Card, CardMedia, CardTitle} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

import {Line} from 'react-chartjs-2'


export default class Detail extends Component {

    constructor() {
        super();

        this.state = {
            testDataSet: [
                {
                    year: 1999,
                    import: 1333333,
                    export: 1233331,
                },
                {
                    year: 2000,
                    import: 1232143,
                    export: 444444,
                },
                {
                    year: 2001,
                    import: 4324324,
                    export: 11111,
                }
            ]
        }
    }

    render() {
        return (
            <div className={flexRow}>
                <Card className={menuColumn}>
                    <CardTitle title={'TOmsk'} subtitle={'Товары'} />
                    <List>
                        <ListItem primaryText="All mail" />
                        <ListItem primaryText="Trash" />
                        <ListItem primaryText="Spam" />
                        <ListItem primaryText="Follow up" />
                    </List>
                </Card>
                <Card className={mainColumn}>
                    <CardMedia>
                        <LineChart data={this.state.testDataSet} />
                    </CardMedia>
                </Card>
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
                    data: props.data.map(item => ({x: item.year, y: item.import})),
                },
                {
                    label: 'Экспорт',
                    data: props.data.map(item => ({x: item.year, y: item.export})),
                }
            ]
        }}
        options={getLineChartOptions()}
    />
);

const getLineChartOptions = () => ({
    layout: { padding: {left: 20, right: 20, top: 20, bottom: 20} },
});
