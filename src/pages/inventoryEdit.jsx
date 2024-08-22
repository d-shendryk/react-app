import { useParams } from "react-router-dom";
import EditItemForm from "../components/editItemForm";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function InventoryEdit() {
  const items = useSelector((state) => state.items);
  const { itemId } = useParams();
  const item = items[itemId];

  return _.isEmpty(items) === false ? (
    <EditItemForm item={item} itemId={itemId} />
  ) : (
    <></>
  );
}
