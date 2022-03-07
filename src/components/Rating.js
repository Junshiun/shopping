import { AiFillStar, AiOutlineStar} from "react-icons/ai"

export const Rating = (props) => {

    const test = {
       border: "none",
       background: "none"
    }

    const Star = () => {
        return (
            [...Array(5)].map((_, index) => {
                return (
                <button key={"star" + index} onClick={() => props.rate_function(index+1)} style={test}>
                    {(index > props.rate -1)? <AiOutlineStar />:<AiFillStar />}
                </button>
            )})
        )
    }

    return (
        <div>
            <Star />
        </div>
    )
}