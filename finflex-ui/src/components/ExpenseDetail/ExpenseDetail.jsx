import "./ExpenseDetail.css"

const ExpenseDetail = () => {
    return (
    <div>
            <div className="title">
            <table style={{margin:"10px", marginTop:"30px"}}>
            <th style={{backgroundColor:"rgb(112, 162, 136)"}}><span>Category</span></th>
            <th style={{backgroundColor:"rgb(112, 162, 136)"}}><span>Name</span></th>
            <th style={{backgroundColor:"rgb(112, 162, 136)"}}><span>Description</span></th>
            <th style={{backgroundColor:"rgb(112, 162, 136)"}}><span>Total</span></th>
            <th style={{backgroundColor:"rgb(112, 162, 136)"}}><span>Date</span></th>
            </table>
            </div>
        
    </div>

    )
}

export default ExpenseDetail;