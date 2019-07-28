import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import asyncComponent from '../../../util/asyncComponent';


const MasterData = ({match}) => (
    <div>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/hierarchies`}/>
            <Route path={`${match.url}/hierarchies`} component={asyncComponent(() => import('./routes/hierarchies'))}/>
            <Route path={`${match.url}/departments`} component={asyncComponent(() => import('./routes/departments'))}/>    
            <Route path={`${match.url}/banks`} component={asyncComponent(() => import('./routes/banks'))}/> 
            <Route path={`${match.url}/lookUps`} component={asyncComponent(() => import('./routes/lookUps'))}/> 
            <Route path={`${match.url}/fields`} component={asyncComponent(() => import('./routes/fields'))}/>
            <Route path={`${match.url}/deviations`} component={asyncComponent(() => import('./routes/deviations'))}/>            
            <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default MasterData;
