import React, {PureComponent} from 'react';
import SpecificRadar from "./SpecificRadar";
import Gauge from "./Gauge";

export default class CityInfo extends PureComponent {
    render() {
        const {info} = this.props;
        const displayName = `${info.city}, ${info.state}`;

        return (
            <div>
                <div>
                    {displayName} |{' '}
                    <a
                        target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
                    >
                        Wikipedia
                    </a>
                </div>
                <Gauge location={info.city}/>
            </div>
        );
    }
}