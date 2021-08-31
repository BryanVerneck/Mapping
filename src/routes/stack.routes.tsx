import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';

import { Confirmation } from '../pages/Confirmation';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { PlaceSelect } from '../pages/PlaceSelect';
import { Preferences } from '../pages/Preferences';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { PlaceDetail } from '../pages/placeDetail';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >

        <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="Preferences"
            component={Preferences}
        />

        <stackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen 
            name="PlaceSelect"
            component={PlaceSelect}
        />

        <stackRoutes.Screen 
            name="Login"
            component={Login}
        />

        <stackRoutes.Screen 
            name="Registration"
            component={Registration}
        />

        <stackRoutes.Screen 
            name="PlaceDetail"
            component={PlaceDetail}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;