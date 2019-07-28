import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import asyncComponent from '../../../util/asyncComponent';


const MasterData = ({match}) => (
    <div>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/products`}/>
            <Route path={`${match.url}/products`} component={asyncComponent(() => import('./routes/products'))}/>         
            <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default MasterData;
