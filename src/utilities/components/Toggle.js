import { Component } from 'react'

export default class Toggle extends Component {
  state = {
    on: false,
  }

  static getDerivatedStateFromProps() {
    
  }

  toggle = () => {
    this.setState(prevState => ({on: !prevState.on}))
  }

  render() {
    const { children } = this.props;
    return children({
      on: this.state.on,
      toggle: this.toggle,
    })
  }
}
