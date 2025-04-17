import React from 'react';
import { View, Text, Image } from 'react-native';


export function Slider(properties: Record<"title" | "description" | "imageUri", string>) {

    return (
        <View className='flex-1 justify-center items-center px-8'>
            <View className='h-1/2 w-full justify-center items-center mb-8'>
                <Text>
                    <Image
                        className='w-80 h-80 bg-gray-100'
                        source={{ uri: properties.imageUri }}
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
