import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { css } from 'emotion'

import AppBar from 'material-ui/AppBar';

import Map from './map/Map'
import Detail from './detail/Detail'


const container = css`
    padding: 3rem;
`;

const Main = () => (
    <main>
        <AppBar title="QEEP-Pro OpenData" showMenuIconButton={false} />
        <div className={container}>
            <Switch>
                <Route exact path='/' component={Map} />
                <Route path='/detail/:id/:name' component={Detail} />
            </Switch>
        </div>
    </main>
);

export default Main
