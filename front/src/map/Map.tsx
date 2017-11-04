import * as React from 'react'

import { css } from 'emotion'

import GoogleMap from './components/GoogleMap'
import Settings from './components/Settings'
import ShortCityInfo from './components/ShortCityInfo'

import { Metric } from  '../model/Metric'
import TimeRange from '../model/TimeRange'
import MapDataItem from '../model/MapDataItem'

import { fetchRange } from '../utils/api/common'
import { fetchMapData } from '../utils/api/map'


interface LocalState {
    metric: Metric

    regional: boolean

    range: TimeRange
    year: number

    data: MapDataItem[]
    currentCityId?: number
}

export default class Map extends React.Component<{}, LocalState> {

    state = {
        metric: 'Import' as Metric,

        regional: true,

        range: {
            start: (new Date).getFullYear() - 1,
            end: (new Date).getFullYear(),
        },
        year: (new Date).getFullYear(),

        data: [],
    } as LocalState

    componentWillMount() {
        fetchRange().then(range => this.setState({range}))
        fetchMapData(this.state.year, this.state.regional).then(data => this.setState({data}))
    }

    render() {
        const {metric, regional, range, year, data, currentCityId} = this.state

        return  (
            <div>
                <GoogleMap
                    metric={metric}
                    data={data}
                    currentCityId={currentCityId}

                    handleChildClick={(cityId: number) => this.setState({currentCityId: cityId})}
                />
                <div className={aside}>
                    <Settings
                        metric={metric}
                        handleChangeMetric={(v: Metric) => this.setState({metric: v})}

                        regional={regional}
                        handleChangeRegional={(v: boolean) => {
                            this.setState({regional: v})
                            this.fetchData(year, v)
                        }}

                        range={range}
                        year={year}
                        handleChangeYear={(v: number) => {
                            this.setState({year: v})
                            this.fetchData(v, regional)
                        }}
                    />
                    <ShortCityInfo
                        data={data.find((item: MapDataItem) => item.city.uid === currentCityId)}
                        year={year}

                        className={css`margin-top: 2rem`}
                    />
                </div>
            </div>
        )
    }

    fetchData = (year: number, regional: boolean) => 
        fetchMapData(year, regional)
            .then(data => this.setState({data}))
}

const aside = css`
    position: relative;
    z-index: 9999;

    width: 30%;

    padding: 2rem;
`