import React from "react";

function Buttons({ name }) {
    return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            {name}
        </div>
    );
}

export default Buttons;
