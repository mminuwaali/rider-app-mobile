import * as Query from "@tanstack/react-query";
// import storage from '@react-native-async-storage/async-storage';
// import * as Persistor from "@tanstack/react-query-persist-client";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new Query.QueryClient(
    // {
    //     defaultOptions: {
    //         queries: {
    //             staleTime: 1000 * 60 * 5,
    //             cacheTime: 1000 * 60 * 60 * 24,
    //         },
    //     }
    // }
);

// const localStoragePersistor = Persistor.createWebStoragePersistor({ storage });

// Persistor.persistQueryClient({
//     queryClient,
//     persistor: localStoragePersistor,
//     maxAge: 1000 * 60 * 60 * 24, // 24 hours
// });

export default function QueryProvider(properties: React.PropsWithChildren) {
    return (
        <Query.QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {properties.children}
        </Query.QueryClientProvider>
    );
}
