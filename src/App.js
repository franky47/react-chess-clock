import React from 'react'
import './App.css'
import Chrono from './Chrono'
import config from './config'

class App extends React.PureComponent {
  state = {
    timeA: config.initialTime,
    timeB: config.initialTime,
    running: false
  }

  render () {
    const { timeA, timeB, running } = this.state
    return (
      <div className='app'>
        <Chrono time={timeA} running={running === 'a'} onClick={this.swap} />
        <section className='controls'>
          { !running && <button onClick={this.start}>Start</button> }
          { !running && <button onClick={this.reset}>Reset</button> }
          { running && <button onClick={this.stop}>Stop</button> }
        </section>
        <Chrono time={timeB} running={running === 'b'} onClick={this.swap} />
      </div>
    )
  }

  reset = () => {
    this.setState({
      timeA: config.initialTime,
      timeB: config.initialTime
    })
  }
  start = (onA = true) => {
    const timer = setInterval(this.tick.bind(this), config.timeDelta * 1000)
    this.setState({
      running: onA ? 'a' : 'b',
      timer
    })
  }
  stop = () => {
    clearInterval(this.state.timer)
    this.setState({
      running: false,
      timer: null
    })
  }
  swap = () => {
    const { running } = this.state
    this.setState({
      running: running ? (running === 'a' ? 'b' : 'a') : false
    })
  }
  tick = () => {
    let { timeA, timeB, running } = this.state
    timeA = Math.max(0, timeA - (running === 'a' ? config.timeDelta : 0))
    timeB = Math.max(0, timeB - (running === 'b' ? config.timeDelta : 0))
    this.setState({ timeA, timeB }, () => {
      if (this.state.timeA === 0 || this.state.timeB === 0) {
        this.stop()
      }
    })
  }
}

export default App
