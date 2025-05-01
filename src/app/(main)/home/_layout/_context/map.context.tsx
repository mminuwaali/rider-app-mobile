import React from "react";
import { MapViewProps, MapMarkerProps, MapPolygonProps } from "react-native-maps";

export interface IMap extends MapViewProps {
    markers?: MapMarkerProps[];
    polylines?: MapPolygonProps[];
}

interface IMapContext {
    props: IMap;
    resetProps: (value?: IMap) => void;
    updateProps: (value: IMap) => void;
}

const MapContext = React.createContext<undefined | IMapContext>(undefined);

export const useMapContext = () => React.useContext(MapContext)!;
export default function MapProvider(properties: React.PropsWithChildren) {
    const [props, setProps] = React.useState<IMap>({});

    const resetProps = (values: IMap = {}) => setProps(
        () => values
    );

    const updateProps = (values: IMap) => setProps(
        prev => ({ ...prev, ...values })
    );

    return <MapContext.Provider value={{ props, updateProps, resetProps }} {...properties} />
}