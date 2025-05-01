import React from 'react';
import { View, Text, Image } from 'react-native';
import { type ImageSourcePropType } from 'react-native';

interface ISliderProps {
    title: string;
    description: string;
    image: ImageSourcePropType;
}

export function Slider(properties: ISliderProps) {

    return (
        <View className='flex-1 justify-center items-center px-8'>
            <View className='h-1/2 w-full justify-center items-center mb-8'>
                <Text>
                    <Image
                        source={properties.image}
                        className='w-80 h-80 object-cover'
                    />
                </Text>
            </View>

            <View className='w-full items-center'>
                <Text className='text-3xl font-bold text-black mb-4 text-center'>
                    {properties.title}
                </Text>

                <Text className='text-base text-gray-600 text-center mb-8 px-4'>
                    {properties.description}
                </Text>
            </View>
        </View>
    );
};
