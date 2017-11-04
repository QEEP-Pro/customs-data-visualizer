import * as React from 'react'

import GoogleMap, { Coords, ChildComponentProps } from 'google-map-react'
import { css } from 'emotion'

import MapDataItem from '../../model/MapDataItem'
import { Metric } from '../../model/Metric'

import getMetricColor from '../../utils/getMetricColor'


interface Props {
    metric: Metric

    data: MapDataItem[]
    currentItem?: MapDataItem
    currentCityId?: number

    handleChildClick: (child: any) => void
}

export default (props: Props) => (
    <div className={container}>
        <GoogleMap
            bootstrapURLKeys={{key: 'AIzaSyBujuD_AcnBbtT_dCNkkwNTg_vLzO7hqPI'}}
            center={{lat: 67.239763, lng: 86.084787} as Coords}
            zoom={1}
            onChildClick={props.handleChildClick}
        >
            {props.data.map((item: MapDataItem) =>
                <MapPoint
                    key={item.city.uid}
                    lat={item.city.lat}
                    lng={item.city.lon}
                    radius={item.getRadiusByMetric(props.metric)}
                    color={getMetricColor(props.metric)}
                    active={props.currentCityId === item.city.uid}
                />
            )}
        </GoogleMap>
    </div>
)

const container = css`
    position: absolute;
    
    width: ${window.innerWidth}px;
    height: ${window.innerHeight - 64}px;
`


interface MapPointProps {
    radius: number
    color?: string
    active?: boolean
}

const MapPoint = (props: MapPointProps & ChildComponentProps) => (
    <div
        className={props.$hover ? hoverDot : normalDot}
        style={{
            position: 'absolute',
            width: props.radius * 2,
            height: props.radius * 2,
            left: -props.radius,
            top: -props.radius
        }}
    >
        <svg>
            <circle
                cx={props.radius}
                cy={props.radius}
                r={props.radius}
                fill={props.active ? '#f44336' : props.color}
            />
        </svg>
    </div>
)

const normalDot = css`
`

const hoverDot = css`
    border-radius: 50%;
    border: 2px solid #9e9e9e;
`