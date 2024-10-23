import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../screens/Landing";
import PlayerConfig from "../screens/PlayerConfig";
import BoardSetup from "../screens/Boardsetup";
import { PlayerData } from "../types";

export type RootStackParamList={
    Landing: undefined;
    PlayerConfig: undefined;
    BoardSetup:{players:PlayerData[]};
}

const Stack=createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC=()=>(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing"
            component={Landing}
            options={{headerShown:false}}/>
            <Stack.Screen name="PlayerConfig"
            component={PlayerConfig}
            options={{title:'Players'}}/>
            <Stack.Screen
            name="BoardSetup"
            component={BoardSetup}
            options={{ title: 'Game Board' }}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default AppNavigator;