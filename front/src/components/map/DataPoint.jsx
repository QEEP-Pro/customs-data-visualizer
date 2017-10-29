import React, {Component} from 'react'

import { css } from 'emotion'


export default class DataPoint extends Component {
    render() {
        const {radius, color, active} = this.props;

        const normalColor = color ? color : 'aqua';

        const activeColor = '#f44336';

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
                    <circle cx={radius} cy={radius} r={radius} fill={active ? activeColor : normalColor} />
                </svg>
            </div>
        )
    }
}

const normalDot = css`
`;

const hoverDot = css`
    border-radius: 50%;
    border: 2px solid #9e9e9e;
`;
