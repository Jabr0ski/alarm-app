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
                <button> - </button>
                <button> + </button>
                <button> {'>'} </button>
                <button> - </button>
                <button> + </button>
            </div>
        )
    }
}

class TTSInput extends React.Component {
    render(){
        return(
            <div>
                <input type= "text"></input>
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
    }

    render(){
        const hour = this.state.time[0];
        const minute = this.state.time[1];

        return(
            <div className='alarm'>
                <h1>Alarm</h1>
                <TimeInput hour={hour} minute={minute}/>
                <ButtonRow />
                <TTSInput />
            </div>
        )
    }
}

ReactDOM.render(
    <Alarm />,
    document.getElementById('root')
);