const OrderSummary = ({ totalScoops }) => {
  const price = totalScoops * 5;

  return (
    <div className="orderSummary">
      <h3>Order Summary</h3>

      <p>Total Scoops: {totalScoops}</p>
      <p>Price: ₪{price}</p>

      {totalScoops === 0 && (
        <p>Your order is empty</p>
      )}
    </div>
  );
};

export default OrderSummary;
