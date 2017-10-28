import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Map from './Map'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Map} />
        </Switch>
    </main>
);

export default Main
