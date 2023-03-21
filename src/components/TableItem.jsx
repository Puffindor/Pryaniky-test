import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import "../styles/Table.css";

const TableItem = function (props) {
  function deleteItem() {
    props.deleteItem(props.props.id);
  }
  function editItem() {
    props.editItem(props.props);
  }
  return (
    <div>
      <div className="table">
        <span>{props.props.companySigDate}</span>
        <span>{props.props.companySignatureName}</span>
        <span>{props.props.documentName}</span>
        <span>{props.props.documentStatus}</span>
        <span>{props.props.documentType}</span>
        <span>{props.props.employeeNumber}</span>
        <span>{props.props.employeeSigDate}</span>
        <span className="text">{props.props.employeeSignatureName}</span>
        <div className="buttons">
          <IconButton onClick={editItem} aria-label="delete" size="large">
            <EditIcon color="primary" fontSize="inherit" />
          </IconButton>
          <IconButton onClick={deleteItem} aria-label="delete" size="large">
            <DeleteIcon color="error" fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default TableItem;
