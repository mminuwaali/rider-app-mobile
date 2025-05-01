import React from 'react';
import { RequestCard } from './_cards/request';
import { Dimensions, FlatList } from 'react-native';
import { useRiderContext } from '../../_layout/_context/rider.context';

export default React.Fragment;
export function Request() {
    const { requests: request } = useRiderContext();

    if (!request) return;
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={Dimensions.get("screen").width * .9}
            className='flex-none mt-auto h-40'
            data={Array.from({ length: 5 })}
            renderItem={() => (
                <RequestCard />
            )}
        />
    );
}