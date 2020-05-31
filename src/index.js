import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class BPMTapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tapCount: 0,
      firstTap: null,
      lastTap: null,
    };
  }

  tapped(e) {
    this.setState({
      tapCount: this.state.tapCount + 1,
      firstTap: this.state.firstTap || e.timeStamp,
      lastTap: e.timeStamp
    });
  }

  reset(e) {
    this.setState({
      tapCount: 0,
      firstTap: null,
      lastTap: null,
    });
  }

  render() {
    const packagedTapData = {
      tapCount: this.state.tapCount,
      firstTap: this.state.firstTap,
      lastTap: this.state.lastTap
    };

    return (
      <div className="container">
        <BPMOutput tapData={packagedTapData}></BPMOutput>
        <Tapper onClick={this.tapped.bind(this)}/>
        <Reset tapData={packagedTapData} onClick={this.reset.bind(this)}/>
      </div>
    );
  }
}

class BPMOutput extends React.Component {
  calculateBPM() {
    var avgMs = (this.props.tapData.lastTap - this.props.tapData.firstTap) / 
                (this.props.tapData.tapCount - 1);

    return Math.round(60 * 1000 / avgMs)
  }

  render() {
    if (this.props.tapData.tapCount < 2) {
      return (<div className="output">Start Tapping</div>);
    } else {
      return (<div className="output">{this.calculateBPM()} BPM</div>);
    }
  }
}

class Tapper extends React.Component {
  render() {
    return (<button onClick={this.props.onClick} className="tap">TAP</button>);
  }
}

class Reset extends React.Component {
  render() {
    if (this.props.tapData.tapCount > 0) {
      return <button onClick={this.props.onClick} className="reset">RESET</button>;
    } else {
      return <button onClick={this.props.onClick} className="reset" disabled>RESET</button>;
    }
  }
}


ReactDOM.render(<BPMTapper />, document.getElementById('root'));
