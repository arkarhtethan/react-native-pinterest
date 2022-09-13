/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { useAuthenticationStatus } from '@nhost/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CreatePinScreen from '../screens/CreatePin';
import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PinScreen from '../screens/PinScreen';
import { default as ProfileScreen } from '../screens/ProfileScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import AuthStackNavigator from './AuthStackNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation ({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator () {
  const { isLoading, isAuthenticated } = useAuthenticationStatus()
  if (isLoading) {
    return <ActivityIndicator />
  }
  return (
    <Stack.Navigator>
      {isAuthenticated ?
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Pin" component={PinScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
        :
        <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator () {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={30} />,
        })}
      />
      <BottomTab.Screen
        name="CreatePin"
        component={CreatePinScreen}
        options={{
          title: 'Create Pin',
          tabBarIcon: ({ color }) => <FontAwesome name="plus" color={color} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" color={color} size={30} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
