import { Link } from "react-router-dom";

function Menu(){
    return(
        <>
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
        </>
    )
}

export default Menu