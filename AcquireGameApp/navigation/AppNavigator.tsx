import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../screens/Landing";
import PlayerConfig from "../screens/PlayerConfig";

export type RootStackParamList={
    Landing: undefined;
    PlayerConfig: undefined;
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
        </Stack.Navigator>
    </NavigationContainer>
)

export default AppNavigator;