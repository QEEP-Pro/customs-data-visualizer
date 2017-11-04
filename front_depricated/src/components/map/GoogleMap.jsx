import React from 'react'

import GoogleMap from 'google-map-react'

import {Card,  CardMedia} from 'material-ui/Card'

import { css } from 'emotion'

import DataPoint from './DataPoint'


const GoogleMapWrapper = (props) => (
    <Card>
        <CardMedia>
            <div className={mapContainer}>
                <GoogleMap
                    apiKey={'AIzaSyBujuD_AcnBbtT_dCNkkwNTg_vLzO7hqPI'}
                    center={[67.239763, 86.084787]}
                    zoom={1}
                    onChildClick={props.handleChildClick}
                >
                    {props.data.map((dataItem, index) =>
                        <DataPoint
                            key={index}
                            lat={dataItem.city.lat}
                            lng={dataItem.city.lon}
                            radius={dataItem[props.metric].radius}
                            amount={dataItem[props.metric].amount}
                            cityId={dataItem.city.uid}
                            active={props.currentDataItem && dataItem.city.uid === props.currentCityId}
                            color={getMetricColor(props.metric)}
                        />
                    )}
                </GoogleMap>
            </div>
        </CardMedia>
    </Card>
);

export default GoogleMapWrapper;

const getMetricColor = (metric) => ({
    import: '#9fa8da',
    export: '#ffe082'
}[metric]);


const mapContainer = css`
    height: ${window.innerWidth * 0.4}px;
`;
