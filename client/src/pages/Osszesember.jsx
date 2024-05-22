import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";

const Osszesember = () => {
  const [ember, setEmber] = useState([]);
  const [kereses, setKereses] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adat = await fetch("http://localhost:3500/emberleker", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (adat.ok) {
          const response = await adat.json();
          setEmber(response.ember);
        } else {
          const response = await adat.json();
          alert(response.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [ember]);

  const torol = (item) => {
    const { _id: id } = item;
    console.log(item);
    const adatTorol = async () => {
      try {
        const toroltAdat = await fetch("http://localhost:3500/embertorol", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item }),
        });

        if (toroltAdat.ok) {
          const modositottAdat = ember.filter((item) => item._id !== id);
          setEmber(modositottAdat);
          const jsonData = await toroltAdat.json();
          alert(jsonData.msg);
        } else {
          const jsonData = await toroltAdat.json();
          alert(jsonData.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    adatTorol();
  };

  const szurtAdat = ember.filter((adat) => {
    const emberKicsi = adat.nev.toLowerCase();
    const keresesKicsi = kereses.toLowerCase();

    return emberKicsi.includes(keresesKicsi);
  });
  return (
    <div className="tarto">
      <div className="form-c">
        <Container>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Keresés név alapján"
              value={kereses}
              onChange={(e) => {
                setKereses(e.target.value);
              }}
            />
          </InputGroup>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Név</th>
                <th>Születési Dátum</th>
                <th>Telefonszám</th>
                <th>Email</th>
                <th>Összeg</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {szurtAdat.map((adat) => (
                <tr key={adat._id}>
                  <td>{adat.nev}</td>
                  <td>{adat.szuletesi_datum}</td>
                  <td>{adat.telefonszam}</td>
                  <td>{adat.email}</td>
                  <td>{adat.magassag}</td>
                  <td>
                    <Button variant="primary" onClick={() => torol(adat._id)}>
                      Törlés
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Osszesember;
