import React from "react";

function StatusList(props) {
  return (
    <span className="status-list">
      G-{props.group} ({props.id}) {props.status ? "True" : "False"}
    </span>
  );
}

export default StatusList;
