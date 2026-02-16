import React from 'react'
import { Text, View } from 'react-native'

export default function Calender({ date }: { date: any }) {
    return (
        <View className='flex-col items-center justify-center mx-2 h-20 w-16 rounded-2xl bg-gray-100 dark:bg-neutral-800'>
            <Text className='text-gray-500 dark:text-gray-400'>{date.day}</Text>
            <Text className='text-gray-500 dark:text-gray-400 font-bold'>{date.date}</Text>
        </View>
    )
}