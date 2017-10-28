import React, {Component} from 'react'

export default class DataPoint extends Component {
    render() {
        const {radius} = this.props

        const greatPlaceStyle = {
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            left: -radius,
            top: -radius
        };

        return(
            <div
                style={greatPlaceStyle}
                onClick={this.props.onClick}
            >
                <svg>
                    <circle cx={radius} cy={radius} r={radius} fill="red" />
                </svg>
            </div>
        )
    }
}
