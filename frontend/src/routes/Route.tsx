import React from 'react';
import {
    RouteProps as ReactDOMRouteProps,
    Route as ReactDOMRoute,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

// true/true = OK
// true/false = Redirecionar ele para o login
// false/true = Redirecionar para o dashboard
// false/false = OK

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default Route;
