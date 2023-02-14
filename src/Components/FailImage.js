import React from "react";
import Logo from '../Images/laughingMan.gif'

export default class FailImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  
  render() {

    const {opacity} = this.props;

    return (
      <div style={{opacity: this.props.opacity}}>
        <img src={Logo} />
      </div>
    )
  }
}
