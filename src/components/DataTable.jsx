import { React, useState, useEffect } from "react";
import TableItem from "./TableItem";
import "../styles/Table.css";
import { Button } from "@mui/material";
import PopUp from "./PopUp";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
const DataTable = function ({ HOST }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState();
  const [changeItem, setChangeItem] = useState({});
  const [pop, setPop] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errorMassage, setErrorMassage] = useState(false);

  useEffect(() => {
    fetchData(localStorage.getItem("token"));
  }, []);
  async function fetchData(token) {
    try {
      let response = await fetch(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: {
            "x-auth": `${token}`,
          },
          method: "GET",
        }
      );
      let result = await response.json();
      setData(result.data);
      setLoaded(true);
      setError(false);
    } catch {
      setError(true);
    }
  }
  async function addNew(item) {
    try {
      let response = await fetch(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
        {
          headers: {
            "x-auth": `${token}`,
            "Content-type": "application/json; charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify(item),
        }
      );
      let result = await response.json();
      if (result.title) {
        setError(true);
        setErrorMassage(result.title);
      } else {
        fetchData(token);
      }
      setPop(false);
    } catch {
      setError(true);
    }
  }

  async function deleteItem(item) {
    try {
      let response = await fetch(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${item}`,
        {
          headers: {
            "x-auth": `${token}`,
          },
          method: "POST",
        }
      );
      let result = await response.json();
      console.log(result);
      fetchData(token);
    } catch {
      setError(true);
    }
  }

  async function updateItem(item) {
    try {
      let response = await fetch(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${item.id}`,
        {
          headers: {
            "x-auth": `${token}`,
            "Content-type": "application/json; charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify(item),
        }
      );
      let result = await response.json();
      if (result.title) {
        setError(true);
        setErrorMassage(result.title);
      } else {
        fetchData(token);
      }

      setPop(false);
    } catch {
      setError(true);
    }
  }

  function editItem(item) {
    setChangeItem(item);
    setTrigger(true);
    setPop(true);
  }
  function OpenPop() {
    setPop(true);
  }

  return (
    <div className="flex">
      {error ? (
        <div className="error">
          <Alert severity="error">{`Ошибка: ${errorMassage}`}</Alert>
        </div>
      ) : (
        <div />
      )}

      <div className="button">
        <Button variant="contained" onClick={OpenPop}>
          Добавить запись
        </Button>
      </div>
      {loaded ? (
        <div className="table-container">
          {pop ? (
            <PopUp
              setTrigger={setTrigger}
              trigger={trigger}
              changeItem={changeItem}
              setPop={setPop}
              addNewItem={addNew}
              updateItem={updateItem}
            />
          ) : (
            <div></div>
          )}
          <div className="table-head">
            <span>
              Дата <br />
              подписи компани
            </span>
            <span>
              Подпись <br /> компани
            </span>
            <span>
              Название <br /> документа
            </span>
            <span>
              Статус <br />
              документа
            </span>
            <span>
              Тип <br />
              документа
            </span>
            <span>
              Номер <br /> сотрудника
            </span>
            <span>
              Дата <br /> подписи сотрудника
            </span>
            <span>
              Подпись <br /> сотрудника
            </span>
          </div>

          {data ? (
            <div className="items-container">
              {data.map((el) => (
                <TableItem
                  editItem={editItem}
                  deleteItem={deleteItem}
                  props={el}
                  key={el.id}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <Box sx={{ width: "80%" }}>
          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>
          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>

          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>

          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>

          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>

          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>

          <div className="sceleton">
            <Skeleton height={100} variant="rectangular" animation="wave" />
          </div>
        </Box>
      )}
    </div>
  );
};
export default DataTable;
