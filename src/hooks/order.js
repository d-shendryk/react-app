import { useSelector } from 'react-redux';
import { checkAvailable } from '@utils';

export function useOrderTotal() {
  const items = useSelector((state) => state.items);
  const order = useSelector((state) => state.order);
  const orderIds = Object.keys(order);

  return orderIds.reduce((prevValue, key) => {
    const item = items[key];
    const count = order[Number(key)];
    const isAvailable = checkAvailable(item?.status);

    return isAvailable ? prevValue + count * item.price : prevValue;
  }, 0);
}
