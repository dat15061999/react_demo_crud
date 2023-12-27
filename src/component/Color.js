import { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
    const [color, setColor] = useState("red");

    return (
        <>
            <h1>My favorite color is {color}!</h1>
            <button
                type="button"
                onClick={() => setColor("green")}
            >Blue</button>
        </>
    )
}
export default FavoriteColor;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<FavoriteColor />);
// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container)
// root.render(FavoriteColor)  