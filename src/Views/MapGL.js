import React, { Component } from 'react';
import ReactMapGL, {LinearInterpolator, WebMercatorViewport, Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl'
import bbox from "@turf/bbox";

import ControlPanel from "./control-panel";
import MAP_STYLE from "../Components/map-style";

import Pins from '../Components/pins';
import CityInfo from '../Components/city-info';

import CITIES from '../Assets/cities.json';

const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 76,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
};

class MapGL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                //width: 1000,
                //height: 900,
                latitude: 56.154403,
                longitude: 10.185093,
                //latitude: 37.785164,
                //longitude: -122.4,
                zoom: 10,
                bearing: 0,
                pitch: 40
            },
            popupInfo: null
        };

        this._map = React.createRef();
    }

    _onClickMarker = city => {
        this.setState({popupInfo: city});
    };

    _renderPopup() {
        const {popupInfo} = this.state;

        return (
            popupInfo && (
                <Popup
                    tipSize={15}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeButton={false}
                    closeOnClick={false}
                    onClose={() => this.setState({popupInfo: null})}
                >
                    <CityInfo info={popupInfo} />
                </Popup>
            )
        );
    }

    _updateViewport = viewport => {
        this.setState({viewport});
    };


    _onClick = event => {
        const feature = event.features[0];
        if (feature) {
            // calculate the bounding box of the feature
            const [minLng, minLat, maxLng, maxLat] = bbox(feature);
            // construct a viewport instance from the current state
            const viewport = new WebMercatorViewport(this.state.viewport);
            const {longitude, latitude, zoom} = viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                padding: 40
            });

            this.setState({
                popupInfo: null,
                viewport: {
                    ...this.state.viewport,
                    longitude,
                    latitude,
                    zoom,
                    transitionInterpolator: new LinearInterpolator({
                        around: [event.offsetCenter.x, event.offsetCenter.y]
                    }),
                    transitionDuration: 1000
                }
            });
        }
    };


    render() {
        const {viewport} = this.state;
        return (
            <ReactMapGL
                ref={this._map}
                //mapStyle={"mapbox://styles/phero/ck7kbxxpx00co1iqqxl5d58dl"}
                mapStyle={MAP_STYLE}
                {...viewport}
                width="100%"
                height="100%"
                interactiveLayerIds={['sf-neighborhoods-fill']}
                onClick={this._onClick}
                onViewportChange={(viewport) => this.setState({viewport})}
                mapboxApiAccessToken={"pk.eyJ1IjoicGhlcm8iLCJhIjoiY2s3a2JveHN4MDBoYjN1cXdiajdkcXp4aiJ9.8VEjj4wvh2NZwWUqg-uSog"}
                >
                <Pins data={CITIES} onClick={this._onClickMarker} />

                {this._renderPopup()}
                <div style={navStyle}>
                    <NavigationControl />
                </div>
                <div style={scaleControlStyle}>
                    <ScaleControl />
                </div>

                <ControlPanel containerComponent={this.props.containerComponent} />
            </ReactMapGL>
        );
    }
}
export default MapGL;