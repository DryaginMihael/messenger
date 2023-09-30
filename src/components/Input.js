import React, {useState, useEffect} from 'react';
import './Input.css';

const Input = ({value: propsValue, type, placeholder, onChange}) => {
    const [value, setValue] = useState(propsValue);

    useEffect(() => setValue(propsValue), [propsValue]);

    return (
        <input
            className="input-field"
            value={value}
            placeholder={placeholder}
            type={type}
            autoComplete="off"
            onChange={(e) => {
                const newValue = e.target.value;
                setValue(newValue);
                onChange(newValue);
            }}
        />
    );
}

export default Input;
