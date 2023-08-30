import React from 'react'

const BorderButton = (props) => {

    const buttonStyle = {
        background: props.background ? props.background : 'initial',
        color: props.color ? props.color : 'initial',
        height: props.height ? props.height : '3.5rem',
        width: props.width ? props.width : '18.5rem',
        justifyContent: props.icon ? 'space-between' : 'center'
    }

    return (
        <div className="border-button" style={buttonStyle} onClick={props.onClick}>
          <p className='button-text'>{props.text}</p>
          {props.icon && <img src={props.icon} alt="arrow"></img>}
        </div>
    );
}

export default BorderButton