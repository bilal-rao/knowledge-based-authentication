import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import asyncComponent from '../../../util/asyncComponent';


const IdentityAccess = ({match}) => (
    <div>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/users`}/>
            <Route path={`${match.url}/users`} component={asyncComponent(() => import('./routes/users'))}/>
            <Route path={`${match.url}/groups`} component={asyncComponent(() => import('./routes/groups'))}/>
            <Route path={`${match.url}/roles`} component={asyncComponent(() => import('./routes/roles'))}/>                                    
            <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default IdentityAccess;
