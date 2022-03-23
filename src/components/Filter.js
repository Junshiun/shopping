import "../css/Filter.css";
import { Rating } from "./Rating.js"
import { useState, useEffect} from "react";
import { CartState } from "../context/Context";
import { SORT_BY_PRICE, SORT_BY_STOCK, SORT_BY_DELIVERY, SORT_BY_RATING, CLEAR_FILTER} from "../context/Reducer";
import { RiArrowDownSLine, RiFilter3Fill } from "react-icons/ri"

export const Filter = () => {

    const {filter:{byprice, bystocks, bydelivery, byratings}, filterdispatch} = CartState();

    const [filter_status, setfilter] = useState(false);

    return (
        <div id="filter-wrapper">
            <div id="filter" className={(filter_status===true)? "expand":"collapse"}>
                <div className="filter-padding">
                    <div className="option-box">
                        <input type="radio" name="order" value="ascending" onChange={() => {filterdispatch({type: SORT_BY_PRICE, sort: "ascending"})}} checked={(byprice=="ascending")? true:false}/>
                        <label htmlFor="ascending">ascending</label>
                    </div>
                    <div className="option-box">
                        <input type="radio" name="order" value="decending" onChange={() => filterdispatch({type: SORT_BY_PRICE, sort: "decending"})}checked={(byprice=="decending")? true:false}/>
                        <label htmlFor="decending">decending</label>
                    </div>
                    <div className="option-box">
                        <input type="checkbox" name="oos" onChange={() => filterdispatch({type: SORT_BY_STOCK})} checked={bystocks}/>
                        <label htmlFor="oos">include out of stock</label>
                    </div>
                    <div className="option-box">
                        <input type="checkbox" name="fd" onChange={() => filterdispatch({type: SORT_BY_DELIVERY})} checked={bydelivery}/>
                        <label htmlFor="fd">fast delivery only</label>
                    </div>
                    <Rating rate={byratings} rate_function={(i) => {filterdispatch({type: SORT_BY_RATING, ratings: i})}}/>
                    <div className="clear-box">
                        <button onClick={() => filterdispatch({type: CLEAR_FILTER})}>clear filters</button>
                    </div>
                    <div className={((filter_status===true)? "expand":"") + " filter-status"} onClick={() => {setfilter(!filter_status); console.log(filter_status)}}><RiFilter3Fill className="filter-arrow" color="white"  fontSize="20px" ></RiFilter3Fill>Filter</div>
                </div>
            </div>
            <div className={((filter_status===true)? "expand":"") + " filter-status-mobile"} onClick={() => {setfilter(!filter_status)}}><RiFilter3Fill className="filter-arrow" color="white"  fontSize="20px" ></RiFilter3Fill>Filter</div>
        </div>
    )
}