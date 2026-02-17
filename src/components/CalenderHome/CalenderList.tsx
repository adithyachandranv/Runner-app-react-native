import React from 'react';
import { FlatList } from 'react-native';
import Calender from './Calender';

const generateDates = (days: number) => {
    const dates = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        dates.push({
            fullDate: d,
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
        });
    }

    return dates;
};

export default function CalenderList() {

    const dates = generateDates(30);

    return (
        <FlatList
            data={dates}
            renderItem={({ item }) => <Calender date={item} />}
            keyExtractor={(item) => item.fullDate.toISOString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={dates.length - 1}
            getItemLayout={(data, index) => ({
                length: 80,          // width of each calendar item
                offset: 80 * index,
                index,
            })}

        />
    );
}
