import React from "react";
import { MapViewProps, MapMarkerProps, MapPolygonProps } from "react-native-maps";

interface IMap extends MapViewProps {
    markers?: MapMarkerProps[];
    polylines?: MapPolygonProps[];
}

interface IMapContext {
    props: IMap;
    updateProps: (value: IMap) => void;
}

const MapContext = React.createContext<undefined | IMapContext>(undefined);

export const useMapContext = () => React.useContext(MapContext)!;
export default function MapProvider(properties: React.PropsWithChildren) {
    const [props, setProps] = React.useState<IMap>({});

    const updateProps = (values: IMap) => setProps(
        prev => ({ ...prev, ...values })
    );

    return <MapContext.Provider value={{ props, updateProps }} {...properties} />
}