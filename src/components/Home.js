import "../css/Home.css"
import { CartState } from "../context/Context.js"
import { Products } from "./Products.js";
import { Filter } from "./Filter.js";
import { Loading } from "./Loading.js";

const Home = () => {
    const {state: {products}, loading} = CartState();

    const Show_products = () => {
        return (
            <div>
                <product />
            </div>
        )
    }

    return (
        <div id="home">
            <Filter />
            {(loading==="loading")?
            <Loading />
            :
            <Products />}
        </div>
    );
}

export default Home