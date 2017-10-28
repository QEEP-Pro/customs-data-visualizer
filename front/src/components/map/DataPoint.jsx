import React, {Component} from 'react'

import { css } from 'emotion'


export default class DataPoint extends Component {
    render() {
        const {radius, color} = this.props

        const greatPlaceStyle = {
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            left: -radius,
            top: -radius
        };

        const className = this.props.$hover ? hoverDot : normalDot;

        return(
            <div
                className={className}
                style={greatPlaceStyle}
                onClick={this.props.onClick}
            >
                <svg>
                    <circle cx={radius} cy={radius} r={radius} fill={color ? color : 'aqua'} />
                </svg>
            </div>
        )
    }
}

const normalDot = css`
`;

const hoverDot = css`
    border-radius: 50%;
    border: 2px solid;
`;
