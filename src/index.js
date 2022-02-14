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
                <button className='dashboardButton' onClick={() => this.props.onClick('hourMinus')}> - </button>
                <button className='dashboardButton' onClick={() => this.props.onClick('hourPlus')}> + </button>
                <button className='dashboardButton' onClick={() => this.props.onClick('stopStart')}> {'>'} </button>
                <button className='dashboardButton' onClick={() => this.props.onClick('minuteMinus')}> - </button>
                <button className='dashboardButton' onClick={() => this.props.onClick('minutePlus')}> + </button>
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
            time: [12, 0]
        }
;        // this.handleClick = this.handleClick.bind(this);
        // this.updateState = this.updateState.bind(this) 
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
                console.log('stop/start');
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
                    <ButtonRow onClick={(i) => this.handleClick(i)}/>
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