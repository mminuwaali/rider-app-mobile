import React from 'react';
import { ScheduleCard } from './_cards/schedule';
import { CreateSchedule } from './_modals/create-schedule';
import { useGetSchedules } from '@/hooks/api/schedule.hook';
import { useAuthContext } from '@/components/providers/auth.provider';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import ViewScheduleDetail from './_modals/view-booking';


export default React.Fragment;
export function Schedule() {
    const { user } = useAuthContext();
    const [open, setOpen] = React.useState("");
    const scheduleQery = useGetSchedules({ user: user?.id });
    const [schedule, setschedule] = React.useState<ISchedule>();

    const data = React.useMemo(
        () => scheduleQery.data?.results || [], [scheduleQery.data]
    );

    return (
        <View className="flex-1 gap-4">
            <TouchableOpacity onPress={() => setOpen("create")} className="h-12 rounded-md items-center justify-center border border-dotted border-gray-300">
                <Text className="font-bold text-gray-400 capitalize">
                    add new schedule
                </Text>
            </TouchableOpacity>

            <FlatList

                data={data}
                className='flex-1'
                contentContainerClassName='gap-2'
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ScheduleCard
                        schedule={item}
                        // onEdit={() => { }}
                        onView={() => { setschedule(item) }}
                    />
                )}
            />

            <Modal visible={open == "create"} onRequestClose={() => setOpen("")}>
                <CreateSchedule schedules={data} closeMOdal={() => setOpen("")} />
            </Modal>

            <Modal visible={schedule !== undefined} onRequestClose={() => setschedule(undefined)}>
                <ViewScheduleDetail schedule={schedule!} onClose={() => setschedule(undefined)} />
            </Modal>
        </View>
    );
}