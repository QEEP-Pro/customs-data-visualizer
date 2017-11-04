import * as React from 'react'

import CategoryInfo from './CategoryInfo'

import DetailDataItem from '../model/DetailDataItem'

import { fetchTotals } from '../utils/api/detail'


interface Props {
    cityId: number
}

interface LocalState {
    data: DetailDataItem[]
}

export default class Totals extends React.Component<Props, LocalState> {

    state = {
        data: [],
    } as LocalState

    componentWillMount() {
        fetchTotals(this.props.cityId).then(data => this.setState({data}))
    }

    render() {
        const { data } = this.state

        return (
            <div>
                <CategoryInfo title={'Общие данные по региону'} data={data} />
            </div>
        )
    }
}

