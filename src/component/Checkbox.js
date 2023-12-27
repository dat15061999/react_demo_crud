import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked, classN }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
            className={classN}
        />
    );
};

export default Checkbox;