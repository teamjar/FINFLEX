import "./BillDetail.css"

const BillDetail = () => {
    return (
    <div>
        <div className="title3">
        <table style={{margin:"10px", marginTop:"30px"}}>
            <th style={{backgroundColor:"#dab785", border:"2px solid #dab785"}}><span>Status</span></th>
            <th style={{backgroundColor:"#dab785", border:"2px solid #dab785"}}><span>Name</span></th>
            <th style={{backgroundColor:"#dab785", border:"2px solid #dab785"}}><span>Description</span></th>
            <th style={{backgroundColor:"#dab785", border:"2px solid #dab785"}}><span>Price</span></th>
            <th style={{backgroundColor:"#dab785", border:"2px solid #dab785"}}><span>Due</span></th>
        </table>
        </div>
        
    </div>

    )
}

export default BillDetail;