import React from 'react'

import './Chrono.css'

const formatTime = (seconds) => {
  const pad = (v) => (v <= 9 ? '0' : '') + v
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds - m * 60)
  const ms = (seconds - m * 60 - s).toFixed(1).substr(2)
  console.log(ms)
  if (seconds >= 60) {
    return `${pad(m)}:${pad(s)}`
  } else {
    return `${pad(s)}.${ms}`
  }
}

export default class Chrono extends React.PureComponent {
  render () {
    const { time, running, onClick } = this.props
    const text = formatTime(time)
    const klass = [
      'chrono',
      running ? ' running' : '',
      time === 0 ? ' over' : ''
    ].join('')
    return (
      <div
        className={klass}
        onClick={onClick}
      >
        { text }
      </div>
    )
  }
}
