import React from "react";
import './Input.css';

const Input = ({id, name, placeholder, type, value, action, classes}) => (
    <div className="input-component">
        <label htmlFor={id}></label>
        <input 
            id={id}
            name={name}
            placeholder={placeholder}
            className={[...classes]}
            type={type}
            value={value}
            onChange={action} />
    </div>
);

export default Input;