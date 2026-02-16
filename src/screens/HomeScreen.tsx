import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View className="flex-1 bg-gray-100 dark:bg-neutral-900 pt-16 px-5">
            <View className="mb-8">
                <Text className="text-3xl font-bold text-gray-800 dark:text-white">Good Morning, Runner!</Text>
                <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">Ready to beat your record?</Text>
            </View>

            {/* Total Stats Card */}
            <View className="bg-white dark:bg-neutral-800 rounded-2xl p-5 flex-row justify-between items-center shadow-sm mb-8">
                <View className="flex-1 items-center">
                    <Text className="text-sm text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-widest">Total Distance</Text>
                    <Text className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">0.0 <Text className="text-base font-semibold text-gray-500 dark:text-gray-400">km</Text></Text>
                </View>
                <View className="w-[1px] h-4/5 bg-gray-200 dark:bg-neutral-700" />
                <View className="flex-1 items-center">
                    <Text className="text-sm text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-widest">Total Runs</Text>
                    <Text className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">0</Text>
                </View>
            </View>

            {/* Recent Activity Section */}
            <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</Text>
                <View className="items-center mt-12">
                    <Ionicons name="footsteps-outline" size={48} color="#ccc" />
                    <Text className="text-gray-400 dark:text-gray-500 text-base mt-2">No runs yet. Start your first run!</Text>
                </View>
            </View>

            {/* Floating Action Button for New Run */}
            <TouchableOpacity
                className="absolute bottom-24 self-center bg-blue-500 dark:bg-blue-600 flex-row items-center py-4 px-8 rounded-full shadow-lg"
                onPress={() => navigation.navigate('Tracker')}
                activeOpacity={0.8}
            >
                <Ionicons name="play" size={32} color="white" />
                <Text className="text-white text-lg font-bold ml-2">NEW RUN</Text>
            </TouchableOpacity>
        </View>
    );
}
