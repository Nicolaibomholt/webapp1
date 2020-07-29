import React, {PureComponent} from 'react';
import TopBar from "../Components/topbar";

export default class ControlPanel extends PureComponent {

    //Menu knapper kan tilføjes her
    render() {
        return (
            <div className="control-panel">
            <TopBar></TopBar>

            </div>
        );
    }
}