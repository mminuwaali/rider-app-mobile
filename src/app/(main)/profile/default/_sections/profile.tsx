import Animated from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import { FadeInDown } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthContext } from '@/components/providers/auth.provider';

export function Profile() {
    const profile = false;
    const { user } = useAuthContext();

    return <Animated.View entering={FadeInDown} className="gap-10 items-center justify-center">
        <TouchableOpacity className="w-32 h-32 rounded-full border-2 border-gray-300 relative items-center">
            <FontAwesome name="user-circle-o" size={100} color="#e3e3e3" className='m-auto' />

            <View className="w-8 h-8 rounded-full border-2 border-gray-300 absolute bottom-0 bg-slate-700 items-center justify-center">
                <Feather name={user?.profile ? 'edit-3' : 'plus-circle'} size={10} color="white" />
            </View>
        </TouchableOpacity>

        <View className="gap-2 items-center justify-center">
            <Text className="font bold text-3xl capitalize">
                {user?.first_name} {user?.last_name}
            </Text>
            <Text className="text-sm px-6 py-2 text-gray-700 bg-gray-200 rounded">
                {user?.email}
            </Text>
        </View>
    </Animated.View>
}