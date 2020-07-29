import MAP_STYLE from '../Style/style';

// Make a copy of the map style
const mapStyle = {
    ...MAP_STYLE,
    sources: {...MAP_STYLE.sources},
    layers: MAP_STYLE.layers.slice()
};

mapStyle.sources['sf-neighborhoods'] = {
    type: 'geojson',
    data:
        './map.geojson'
};

mapStyle.layers.push(
    {
        id: 'sf-neighborhoods-fill',
        source: 'sf-neighborhoods',
        type: 'fill',
        paint: {
            'fill-outline-color': '#6633cc',
            'fill-color': '#fff',
            'fill-opacity': 0.2
        }

    },
    {
        id: 'sf-neighborhoods-outline',
        source: 'sf-neighborhoods',
        type: 'line',
        paint: {
            'line-width': 2,
            'line-color': '#6633cc'
        }
    },
    {
        id: 'sf-neighborhoods-text',
        source: 'sf-neighborhoods',
        type: 'symbol',
        layout: {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            //'icon-image': ['concat', ['get', 'icon'], '-15'],
            // get the title name from the source's "title" property
            'text-field': ['get', 'DISTRIKT'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
        }
    }
);

export default mapStyle;