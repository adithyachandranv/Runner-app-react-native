import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracker'>;

export default function TrackerScreen({ navigation }: Props) {

    // 🔥 SWITCH THIS TO FALSE WHEN TESTING OUTSIDE
    const DEV_MODE = true;

    const testRoute = [
        { latitude: 12.9716, longitude: 77.5946 },
        { latitude: 12.9717, longitude: 77.5947 },
        { latitude: 12.9718, longitude: 77.5948 },
        { latitude: 12.9719, longitude: 77.5949 },
    ];

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState('');

    const locationSubscription = useRef<Location.LocationSubscription | null>(null);
    const fakeTrackingRef = useRef<NodeJS.Timeout | null>(null);

    // ========================
    // 📍 LOCATION PERMISSION
    // ========================
    const requestPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Location permission is required');
            return false;
        }
        return true;
    };

    // ========================
    // 🌍 REAL GPS TRACKING
    // ========================
    const startLocationTracking = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        locationSubscription.current = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 2000,
                distanceInterval: 3,
            },
            (location) => {
                setLocations(prev => {
                    if (prev.length > 0) {
                        const prevLocation = prev[prev.length - 1];

                        const newDistance = calculateDistance(
                            prevLocation.coords.latitude,
                            prevLocation.coords.longitude,
                            location.coords.latitude,
                            location.coords.longitude
                        );

                        if (newDistance < 0.05) {
                            setDistance(d => d + newDistance);
                        }
                    }

                    return [...prev, location];
                });
            }
        );
    };

    const [locations, setLocations] = useState<Location.LocationObject[]>([]);

    // ========================
    // 🧪 FAKE TRACKING (DEV)
    // ========================
    const startFakeTracking = () => {
        let index = 0;

        fakeTrackingRef.current = setInterval(() => {
            if (index >= testRoute.length - 1) {
                index = 0;
            }

            const prev = testRoute[index];
            const next = testRoute[index + 1];

            const newDistance = calculateDistance(
                prev.latitude,
                prev.longitude,
                next.latitude,
                next.longitude
            );

            setDistance(d => d + newDistance);
            index++;

        }, 2000);
    };

    // ========================
    // 📐 DISTANCE CALCULATION
    // ========================
    const toRad = (value: number) => (value * Math.PI) / 180;

    const calculateDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    // ========================
    // ⏱ TIMER
    // ========================
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(sc => sc + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // ========================
    // ▶ START / PAUSE
    // ========================
    const toggleRun = async () => {

        if (!isRunning) {
            if (DEV_MODE) {
                startFakeTracking();
            } else {
                await startLocationTracking();
            }
        } else {
            locationSubscription.current?.remove();
            if (fakeTrackingRef.current) {
                clearInterval(fakeTrackingRef.current);
            }
        }

        setIsRunning(!isRunning);
    };

    // ========================
    // 🛑 STOP
    // ========================
    const handleStop = () => {
        setIsRunning(false);

        locationSubscription.current?.remove();
        locationSubscription.current = null;

        if (fakeTrackingRef.current) {
            clearInterval(fakeTrackingRef.current);
        }

        setTime(formatTime(seconds));
        setSeconds(0);
        setDistance(0);
        setLocations([]);
    };

    // ========================
    // 🎨 UI
    // ========================
    return (
        <View className="flex-1 bg-white dark:bg-neutral-950 px-6 pt-14">

            <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                Run Tracker
            </Text>

            <View className="flex-row justify-between mb-10">

                <View className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl p-5 mr-3 items-center">
                    <Text className="text-xs text-gray-500 uppercase tracking-widest">
                        Distance
                    </Text>
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {distance.toFixed(2)}
                    </Text>
                    <Text className="text-sm text-gray-400">km</Text>
                </View>

                <View className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl p-5 items-center">
                    <Text className="text-xs text-gray-500 uppercase tracking-widest">
                        Pace
                    </Text>
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        --:--
                    </Text>
                    <Text className="text-sm text-gray-400">min/km</Text>
                </View>
            </View>

            <View className="flex-1 justify-center items-center">
                <Text className="text-6xl font-light text-gray-900 dark:text-white tabular-nums">
                    {formatTime(seconds)}
                </Text>
                <Text className="text-gray-400 text-sm tracking-widest mt-2">
                    DURATION
                </Text>
            </View>

            <View className="flex-row justify-center items-center mb-12">

                {!isRunning && seconds > 0 && (
                    <TouchableOpacity
                        className="w-20 h-20 rounded-full justify-center items-center bg-red-500 mr-6"
                        onPress={handleStop}
                    >
                        <Ionicons name="stop" size={30} color="white" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    className={`w-24 h-24 rounded-full justify-center items-center ${isRunning ? 'bg-yellow-500' : 'bg-green-500'}`}
                    onPress={toggleRun}
                >
                    <Ionicons
                        name={isRunning ? "pause" : "play"}
                        size={44}
                        color="white"
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
}
