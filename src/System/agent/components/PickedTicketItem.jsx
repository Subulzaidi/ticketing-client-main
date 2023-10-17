import React from "react";
import use2ndSla from "../../../utils/use2ndSla";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";

const PickedTicketItem = ({ x, index }) => {
  const elapsedTime = use2ndSla(x.pickedAt);
  return (
    <>
      <tr>
        <th scope="row">{++index}</th>
        <td>{x.title}</td>
        <td>{x.pickedAt.slice(0, 10)}</td>
        <td>{x.priority}</td>
        <td>{x.createdAt.slice(0, 10)}</td>
        <td>
          {x.firstSLABreach ? <span className="breached px-3">Yes</span> : "--"}
        </td>

        <th scope="row">
          <span
            className={`${elapsedTime >= 600 && "breached"} text-center px-3`}
          >
            {elapsedTime}
          </span>
        </th>
        <th>
          <Link to={`/agent/single/${x._id}`}>
            <BiLinkExternal role="button" />
          </Link>
        </th>
      </tr>
    </>
  );
};

export default PickedTicketItem;
