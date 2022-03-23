import { CartState } from "../context/Context.js"
import "../css/Loading.css"

export const Loading = () => {

    return (
        <div className="loading">
            loading...
            <div className="dotsBox">
                <div className="dotOne"></div>
                <div className="dotTwo"></div>
                <div className="dotThree"></div>
            </div>
        </div>
    );
}