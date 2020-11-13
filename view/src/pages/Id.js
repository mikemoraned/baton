import {
  useParams
} from "react-router-dom";

export function Id() {
    const { id } = useParams();
    return <h2>Id: {id}</h2>;
}
  