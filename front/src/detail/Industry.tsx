import * as React from 'react'
import { match as Match } from 'react-router-dom'

import CategoryInfo from './CategoryInfo'

import DetailDataItem from '../model/DetailDataItem'

import { fetchIndustry } from '../utils/api/detail'

interface Props {
    match: Match<{
        cityId: number
        industryName: string
        industryId: number
    }>
}

interface LocalState {
    data: DetailDataItem[]
}


export default class Totals extends React.Component<Props, LocalState> {
    
        state = {
            data: [],
        } as LocalState

        componentWillMount() {
            this.componentWillReceiveProps(this.props)
        }
    
        componentWillReceiveProps(nextProps: Props) {
            const { cityId, industryId } = nextProps.match.params
            this.setState({data: []})

            fetchIndustry(cityId, industryId).then(data => this.setState({data}))
        }
    
        render() {
            const { data } = this.state
            const industryName = this.props.match.params.industryName
    
            return (
                <div>
                    <CategoryInfo title={industryName} data={data} />
                </div>
            )
        }
    }
