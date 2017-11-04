import * as React from 'react'

import { Switch, Route, Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import AppBar from 'material-ui/AppBar'

import Map from './map/Map'
import Detail from './detail/Detail'


export default () => (
    <main>
        <AppBar
            title={'QEEP-Pro OpenData'}
            showMenuIconButton={false}
            iconElementRight={<FlatButton label={'Карта'} containerElement={<Link to='/' />} />}
        />
        <div>
            <Switch>
                <Route exact path='/' component={Map} />
                <Route path='/:cityId-:cityName' component={Detail} />
            </Switch>
        </div>
    </main>
)
