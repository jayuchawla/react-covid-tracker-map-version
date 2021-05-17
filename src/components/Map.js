import { Marker, Popup } from 'leaflet';
import React from 'react';
import { Map as LeafletMap, TileLayer, Circle } from 'react-leaflet';
import { showDataOnMap } from '../util/showDataOnMap';

import '../styles/map.css';

function Map({ data, casesType, center, zoom }) {
    return (
        <div className="map">
            {
                <LeafletMap
                    className="markercluster-map"
                    center={center}
                    zoom={zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {showDataOnMap(data, casesType)}
                </LeafletMap>
            }
        </div>
    )
}

export default Map;
