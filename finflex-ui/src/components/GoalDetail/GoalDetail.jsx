import "./GoalDetail.css"

const GoalDetail = () => {
    return (
    <div>
        <div className="title2">
        <table style={{margin:"10px", marginTop:"30px"}}>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Category</span></th>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Name</span></th>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Description</span></th>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Target</span></th>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Due</span></th>
            <th style={{backgroundColor:"rgb(4, 57, 94)", border:"2px solid rgb(4, 57, 94)"}}><span>Funds</span></th>
            </table>
        </div>

        
    </div>

    )
}

export default GoalDetail;