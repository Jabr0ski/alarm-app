import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TimeInput extends React.Component {
    render(){
        const hour = this.props.hour.toLocaleString(
            'en-US', {minimumIntegerDigits: 2, useGrouping:false}
        )
        const minute = this.props.minute.toLocaleString(
            'en-US', {minimumIntegerDigits: 2, useGrouping:false}
        )
        return(
            <div className="time">
                {hour}:{minute}
            </div>
        )
    }
}

class ButtonRow extends React.Component {
    render(){
        return(
            <div>
                <button className='dashboardButton' disabled={this.props.disabled} 
                onClick={() => this.props.onClick('hourMinus')}> - </button>
                <button className='dashboardButton' disabled={this.props.disabled}
                onClick={() => this.props.onClick('hourPlus')}> + </button>
                <button className='dashboardButton'
                onClick={() => this.props.onClick('stopStart')}> {'>'} </button>
                <button className='dashboardButton' disabled={this.props.disabled}
                onClick={() => this.props.onClick('minuteMinus')}> - </button>
                <button className='dashboardButton' disabled={this.props.disabled}
                onClick={() => this.props.onClick('minutePlus')}> + </button>
            </div>
        )
    }
}

class TTSInput extends React.Component {
    render(){
        return(
            <div>
                <input type= "text" className='ttsBox' 
                placeholder='Type a message here to be read when the alarm goes off'>
                </input>
            </div>
        )
    }
}

class Alarm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: [12, 0],
            alarmStarted: false
        };
        this.alarmTimer = null;
    }
    
    calculateAlarm(currentDate, time){
        const hour = time[0];
        const minute = time[1];
        let hourDiffToSec = ((hour - currentDate.getHours() + 24)) * 3600
        let minDiffToSec = ((minute - currentDate.getMinutes())) * 60
        let totalDiff = ((hourDiffToSec + minDiffToSec - currentDate.getSeconds())*1000) % 86400000
        return(totalDiff)
    }

    handleClick(i){
        const time = this.state.time;
        const hour = time[0];
        const minute = time[1];
        
        switch(i) {
            case 'hourMinus':
                this.setState({
                    time: [(hour+23) % 24, minute]
                });
                break;
            case 'hourPlus':
                this.setState({
                    time: [(hour+1) % 24, minute]
                });
                break;
            case 'stopStart':
                if(!this.alarmStarted){
                    let currentDate = new Date();
                    this.alarmTimer = setTimeout(console.log, this.calculateAlarm(currentDate, time), "buzz");
                } else {
                    clearTimeout(this.alarmTimer)
                }
                this.setState({alarmStarted : !this.state.alarmStarted});
                break;
            case 'minuteMinus':
                this.setState({
                    time: [hour, (minute+59) % 60]
                });
                break;
            case 'minutePlus':
                this.setState({
                    time: [hour, (minute+1) % 60]
                });
                break;
            default:
                console.log('hello');
        }
    }

    render(){
        const hour = this.state.time[0];
        const minute = this.state.time[1];

        return(
            <div>
                <div className='alarm dashboard'>
                    <TimeInput hour={hour} minute={minute}/>
                    <ButtonRow 
                    onClick={(i) => this.handleClick(i)}
                    disabled ={this.state.alarmStarted}
                    />
                </div>
                <div>
                    <TTSInput />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Alarm />,
    document.getElementById('root')
);