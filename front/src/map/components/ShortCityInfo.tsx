import * as React from 'react'

import { Link } from 'react-router-dom'

import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import MapDataItem from '../../model/MapDataItem'

import addSpacesToNumber from '../../utils/addSpacesToNumber'


interface Props {
    data?: MapDataItem
    year: number

    className?: string
}

export default (props: Props) => (
    <Card className={props.className}>
        <CardTitle
            title={props.data ? props.data.city.name : 'Выберите город'}
            subtitle={`Данные за ${props.year} год`}
        />
        {props.data &&
            <div>
                <CardText>
                    <p>{`Импорт ${addSpacesToNumber(props.data.import.amount)} $`}</p>
                    <p>{`Экспорт ${addSpacesToNumber(props.data.export.amount)} $`}</p>
                </CardText>
                <CardActions>
                    <FlatButton
                        label={'Подробнее'}
                        containerElement={<Link to={`/${props.data.city.uid}-${props.data.city.name}`} />}
                        linkButton
                    />
                </CardActions>
            </div>
        }
    </Card>
)
