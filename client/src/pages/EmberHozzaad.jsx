import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EmberHozzaad = () => {
  const [nev, setNev] = useState("");
  const [szuletesi_datum, setSzuletesi_datum] = useState("");
  const [telefonszam, setTelefonszam] = useState("");
  const [email, setEmail] = useState("");
  const [kedvencSzin, setKedvencSzin] = useState("");
  const [magassag, setMagassag] = useState("");

  const feldolgoz = (event) => {
    event.preventDefault();

    const adatok = {
      nev,
      szuletesi_datum,
      telefonszam,
      email,
      kedvencSzin,
      magassag,
    };

    const elkuld = async () => {
      const adat = await fetch("http://localhost:3500/emberhozzaad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adatok),
      });

      if (adat.ok) {
        const response = await adat.json();
        alert(response.msg);
        setNev("");
        setSzuletesi_datum("");
        setTelefonszam("");
        setEmail("");
        setKedvencSzin("");
        setMagassag("");
      } else {
        const response = await adat.json();
        alert(response.msg);
      }
    };
    elkuld();
  };
  return (
    <div className="tarto">
      <p>Ember felvétele</p>
      <div
        className="container align-center"
        style={{
          width: "400px",
          backgroundColor: "royalblue",
          height: "500px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add meg a nevet!"
              onChange={(e) => {
                setNev(e.target.value);
              }}
            />
            <Form.Label>Születési Dátum</Form.Label>
            <Form.Control
              type="date"
              placeholder="Add meg a születési dátumot!"
              onChange={(e) => {
                setSzuletesi_datum(e.target.value);
              }}
            />
            <Form.Label>telefonszam</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTelefonszam(e.target.value);
              }}
              placeholder="Add meg a telefonszámot!"
            />
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Add meg a emailt!"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Label>kedvenc szin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add meg a kedvenc szint!"
              onChange={(e) => {
                setKedvencSzin(e.target.value);
              }}
            />
            <Form.Label>magassag</Form.Label>
            <Form.Control
              type="number"
              placeholder="Add meg a magasságot!"
              onChange={(e) => {
                setMagassag(e.target.value);
              }}
            />
            <Button variant="success" onClick={feldolgoz}>
              Primary
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default EmberHozzaad;
