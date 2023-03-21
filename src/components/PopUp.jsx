import { Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { React, useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import "../styles/PopUp.css";

class Item {
  constructor(
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName
  ) {
    this.companySigDate = companySigDate;
    this.companySignatureName = companySignatureName;
    this.documentName = documentName;
    this.documentStatus = documentStatus;
    this.documentType = documentType;
    this.employeeNumber = employeeNumber;
    this.employeeSigDate = employeeSigDate;
    this.employeeSignatureName = employeeSignatureName;
  }
}

class UpdatedItem extends Item {
  constructor(
    id,
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName
  ) {
    super(
      companySigDate,
      companySignatureName,
      documentName,
      documentStatus,
      documentType,
      employeeNumber,
      employeeSigDate,
      employeeSignatureName
    );
    this.id = id;
  }
}

const PopUp = function ({
  setPop,
  addNewItem,
  changeItem,
  trigger,
  setTrigger,
  updateItem,
}) {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [companySigDate, setCompanySigDate] = useState("");
  const [companySignatureName, setCompanySignatureName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeeSigDate, setEmployeeSigDate] = useState("");
  const [employeeSignatureName, setEmployeeSignatureName] = useState("");

  function close() {
    setPop(false);
  }

  useEffect(() => {
    if (trigger) {
      setId(changeItem.id);
      setCompanySigDate(dayjs(changeItem.companySigDate));
      setCompanySignatureName(changeItem.companySignatureName);
      setDocumentName(changeItem.documentName);
      setDocumentStatus(changeItem.documentStatus);
      setDocumentType(changeItem.documentType);
      setEmployeeNumber(changeItem.employeeNumber);
      setEmployeeSigDate(dayjs(changeItem.employeeSigDate));
      setEmployeeSignatureName(changeItem.employeeSignatureName);
      setTrigger(false);
      setEdit(true);
    }
  });

  function addNew() {
    if (edit === true) {
      updateItem(
        new UpdatedItem(
          id,
          companySigDate,
          companySignatureName,
          documentName,
          documentStatus,
          documentType,
          employeeNumber,
          employeeSigDate,
          employeeSignatureName
        )
      );
      setEdit(false);
      close();
    } else {
      addNewItem(
        new Item(
          companySigDate,
          companySignatureName,
          documentName,
          documentStatus,
          documentType,
          employeeNumber,
          employeeSigDate,
          employeeSignatureName
        )
      );
    }
  }

  return (
    <div className="popup-out">
      <div className="popup-in">
        <div className="close">
          <IconButton onClick={close}>
            <CloseIcon color="error" />
          </IconButton>
        </div>
        <div className="inputs">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="companySigDate"
              value={companySigDate}
              onChange={(newValue) => setCompanySigDate(newValue)}
            />
          </LocalizationProvider>

          <TextField
            value={companySignatureName}
            onChange={(event) => setCompanySignatureName(event.target.value)}
            id="outlined-basic"
            label="companySignatureName"
            variant="outlined"
          />
          <TextField
            value={documentName}
            onChange={(event) => setDocumentName(event.target.value)}
            id="outlined-basic"
            label="documentName"
            variant="outlined"
          />
          <TextField
            value={documentStatus}
            onChange={(event) => setDocumentStatus(event.target.value)}
            id="outlined-basic"
            label="documentStatus"
            variant="outlined"
          />
          <TextField
            value={documentType}
            onChange={(event) => setDocumentType(event.target.value)}
            id="outlined-basic"
            label="documentType"
            variant="outlined"
          />
          <TextField
            value={employeeNumber}
            onChange={(event) => setEmployeeNumber(event.target.value)}
            id="outlined-basic"
            label="employeeNumber"
            variant="outlined"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="employeeSigDate"
              value={employeeSigDate}
              onChange={(newValue) => setEmployeeSigDate(newValue)}
            />
          </LocalizationProvider>

          <TextField
            value={employeeSignatureName}
            onChange={(event) => setEmployeeSignatureName(event.target.value)}
            id="outlined-basic"
            label="employeeSignatureName"
            variant="outlined"
          />
        </div>
        <div>
          {edit ? (
            <Button variant="contained" onClick={addNew}>
              Изменить
            </Button>
          ) : (
            <Button variant="contained" onClick={addNew}>
              Добавить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;

// "companySigDate" - строка содержащая дату и время в ISO формате*
// "companySignatureName" – произвольная строка
// "documentName" – произвольная строка
// "documentStatus" – произвольная строка
// "documentType" – произвольная строка
// "employeeNumber" - произвольная строка
// "employeeSigDate" - строка содержащая дату и время в ISO формате*
// "employeeSignatureName" - произвольная строка
