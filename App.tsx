import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import TrackerScreen from './src/screens/TrackerScreen';

// 1. Define the parameters for our screens
export type RootStackParamList = {
    Tabs: undefined;
    Tracker: undefined;
};

export type TabParamList = {
    Home: undefined;
    Tracker: undefined;
};


const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TAB_SCREENS = [
    {
        name: 'Home',
        component: HomeScreen,
        icon: {
            active: 'home',
            inactive: 'home-outline',
        },
    },
    {
        name: 'Tracker',
        component: TrackerScreen,
        icon: {
            active: 'walk',
            inactive: 'walk-outline',
        },
    },
];


function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                const currentTab = TAB_SCREENS.find(
                    tab => tab.name === route.name
                );

                return {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',

                        left: 20,
                        right: 20,
                        backgroundColor: '#2C2C2C',
                        borderTopWidth: 0,
                        borderRadius: 40,
                        height: 80,
                        paddingTop: 20,

                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,

                    },

                    tabBarIcon: ({ focused, color }) => {
                        const iconName = focused
                            ? currentTab?.icon.active
                            : currentTab?.icon.inactive;

                        if (focused) {
                            return (
                                <View
                                    style={{
                                        backgroundColor: '#e6ed51ff',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 5,
                                    }}
                                >
                                    <Ionicons
                                        name={iconName as any}
                                        size={24}
                                        color="#232323ff"
                                    />
                                </View>
                            );
                        }

                        return (
                            <Ionicons
                                name={iconName as any}
                                size={28}
                                color={color}
                            />
                        );
                    },
                };
            }}
        >
            {TAB_SCREENS.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name as keyof TabParamList}
                    component={tab.component}
                />
            ))}
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tracker"
                    component={TrackerScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
