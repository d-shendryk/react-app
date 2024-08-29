import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { EditItemForm } from '~/components/editItemForm';

export function InventoryEditPage() {
  const items = useSelector((state) => state.items);
  const { itemId } = useParams();
  const item = items[itemId];

  return !_.isEmpty(items) ? (
    <EditItemForm item={item} itemId={itemId} />
  ) : (
    <> </>
  );
}
