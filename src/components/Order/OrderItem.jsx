import './OrderItem.css';

export default function OrderItem({orderItem, handleChangeQty, isPaid}){
    return (
        <>
        <div className="LineItem">
      <div className="flex-ctr-ctr">{orderItem.menuItem.emoji}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{orderItem.menuItem.name}</span>
        <span>{orderItem.menuItem.price.toFixed(2)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
        {!isPaid &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(orderItem.menuItem._id, orderItem.quantity - 1)}
          >−</button>
        }
        <span>{orderItem.quantity}</span>
        {!isPaid &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(orderItem.menuItem._id, orderItem.quantity + 1)}
          >+</button>
        }
      </div>
      <div className="ext-price">${orderItem.extPrice.toFixed(2)}</div>
    </div>
        </>
    );
}