import { useParams } from "react-router-dom";
import Chart from '../Chart/Chart'
import { StockProvider } from "../../Context/StockContext";
import Navbar from '../Navbar/Navbar'
import StockSide from '../StockSide/StockSide'

const StockDetails = () => {
  const { symbol } = useParams();

  return (
    <StockProvider symbol={symbol}>
      <div className="stock-details">
        <Navbar />
        <StockSide />
        <Chart />
      </div>
    </StockProvider>
  );
};

export default StockDetails;
