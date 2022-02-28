import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* the time display hh:mm */
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

/* the functional buttons below the time/alarm display */
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

/* text box to type in text to be converted to speech */
class TTSInput extends React.Component {
    render(){
        return(
            <div>
                <input type= "text" className='ttsBox' 
                placeholder='Type a message here to be read when the alarm rings'
                value={this.props.ttsText}
                onChange={this.props.onChange}>
                </input>
            </div>
        )
    }
}

function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 0.8;
    msg.pitch = 1;
    msg.text = text;
    msg.lang = 'en-US';
    
    speechSynthesis.speak(msg);
}

/* contains all other components */
class Alarm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: [12, 0],
            alarmStarted: false,
            ttsText: ''
        };
        this.alarmTimer = null;
        this.ringAlarm = this.ringAlarm.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
     
    /* calculates the difference in time between 
     now and when the alarm should chime */
    calculateAlarm(currentDate, time){
        const hour = time[0];
        const minute = time[1];
        
        let hourDiffToSec = ((hour - currentDate.getHours() + 24)) * 3600
        let minDiffToSec = ((minute - currentDate.getMinutes())) * 60
        let totalDiff = ((hourDiffToSec + minDiffToSec - currentDate.getSeconds())*1000) % 86400000
        return(totalDiff)
    }

    ringAlarm(){
        const alarmText = "Wake up, it's Wordle day!"
        var transcript = this.state.ttsText ? this.state.ttsText : alarmText;
        for(let i = 0; i < 100 ; i++){
            speak(transcript);  
        }  
    }

    stopAlarm(){
        speechSynthesis.cancel();
        clearTimeout(this.alarmTimer);
    }

    handleClick(i){
        const time = this.state.time;
        const hour = time[0];
        const minute = time[1];
        const alarmStarted = this.state.alarmStarted;

        switch(i) {
            /* decrease hour by 1 */
            case 'hourMinus':
                this.setState({
                    time: [(hour+23) % 24, minute]
                });
                break;
            /* increase hour by 1 */
            case 'hourPlus':
                this.setState({
                    time: [(hour+1) % 24, minute]
                });
                break;
            /* if unset, sets the timer to go off at the displayed 
            chosen time, deactivating the other buttons. Else, 
            unlocks buttons and cancels the currently set alarm */
            case 'stopStart':
                if(!alarmStarted){
                    let currentDate = new Date();
                    this.alarmTimer = setTimeout(this.ringAlarm, this.calculateAlarm(currentDate, time));
                } else {
                    this.stopAlarm();
                }
                this.setState({alarmStarted : !alarmStarted});
                break;
            /* decrease minutes by 1 */
            case 'minuteMinus':
                this.setState({
                    time: [hour, (minute+59) % 60]
                });
                break;
            /* increase minutes by 1 */
            case 'minutePlus':
                this.setState({
                    time: [hour, (minute+1) % 60]
                });
                break;
            default:
                console.log('hello');
        }
    }

    handleChange(event){
        this.setState({ttsText: event.target.value});
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
                    <TTSInput
                    value={this.state.ttsText} 
                    onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Alarm />,
    document.getElementById('root')
);