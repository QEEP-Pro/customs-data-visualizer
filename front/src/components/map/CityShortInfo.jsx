import React from 'react'
import {Link} from 'react-router-dom'

import { css } from 'emotion'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'

import addSpacesToNumber from '../../utils/addSpacesToNumber'


const CityShortInfo = (props) => (
    <Card>
        <CardTitle
            title={props.dataItem ? props.dataItem.city.name : 'Выберите регион'}
            subtitle={props.dataItem ? `Данные за ${props.year} год` : null}
        />
        <CardText>
            {props.dataItem &&
            <div>
                <p>Импорт <span className={largeText}>{addSpacesToNumber(props.dataItem.import.amount)}</span> $</p>
                <p>Экспорт <span className={largeText}>{addSpacesToNumber(props.dataItem.export.amount)}</span> $</p>
            </div>
            }
        </CardText>
        <CardActions>
            {props.dataItem &&
            <Link to={`/detail/${props.dataItem.city.uid}`}>Подробнее</Link>
            }
        </CardActions>
    </Card>
);

export default CityShortInfo;


const largeText = css`
    font-size: 1.2rem;
`;
