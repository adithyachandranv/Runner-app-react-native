import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracker'>;

export default function TrackerScreen({ navigation }: Props) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [distance, setDistance] = useState(0); // in km

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(sc => sc + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // Format time: HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleRun = () => setIsRunning(!isRunning);

    return (
        <View className="flex-1 bg-white dark:bg-neutral-900 px-5 pt-10">
            {/* Top Stats */}
            <View className="flex-row justify-between mt-5">
                <View className="items-center">
                    <Text className="text-gray-500 dark:text-gray-400 text-sm uppercase">Distance</Text>
                    <Text className="text-gray-900 dark:text-white text-4xl font-bold mt-1">
                        {distance.toFixed(2)} <Text className="text-lg font-normal text-gray-500 dark:text-gray-400">km</Text>
                    </Text>
                </View>
                <View className="items-center">
                    <Text className="text-gray-500 dark:text-gray-400 text-sm uppercase">Pace</Text>
                    <Text className="text-gray-900 dark:text-white text-4xl font-bold mt-1">
                        --:-- <Text className="text-lg font-normal text-gray-500 dark:text-gray-400">/km</Text>
                    </Text>
                </View>
            </View>

            {/* Main Timer */}
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-900 dark:text-white text-7xl font-light tabular-nums">{formatTime(seconds)}</Text>
                <Text className="text-gray-500 text-sm tracking-widest -mt-2">DURATION</Text>
            </View>

            {/* Controls */}
            <View className="flex-row justify-center items-center mb-16 gap-8">
                {!isRunning && seconds > 0 && (
                    <TouchableOpacity
                        className="w-20 h-20 rounded-full justify-center items-center bg-red-500 shadow-lg"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="stop" size={32} color="white" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    className={`w-24 h-24 rounded-full justify-center items-center shadow-lg ${isRunning ? 'bg-yellow-400' : 'bg-green-500'}`}
                    onPress={toggleRun}
                >
                    <Ionicons name={isRunning ? "pause" : "play"} size={48} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
