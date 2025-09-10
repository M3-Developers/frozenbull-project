import './Reserve.css';
import Header from '../../components/Header/Header';
import tempJson from '../../TempJson.json';
import { useState } from 'react';

const Reserve = () => {
  const [selectedTable, setSelectedTable] = useState();

  const handleSelectTable = e => {
    const tableId = e.target.value;

    if (tableId === 'invalid') {
      setSelectedTable(null);
    }

    setSelectedTable(tempJson?.find(table => table.id.toString() === tableId));
  };

  return (
    <main className="reserve-container">
      <Header
        returnPage={'landingPage'}
        showNavbar={false}
        showUser={true}
        state={'dinamic'}
      />
      <section className="reserve-content">
        <aside className="reserveTable-container">
          <h2>Reservar de Mesas</h2>
          <select
            name="reserveTable"
            id="reserveTable"
            onChange={handleSelectTable}
            required
          >
            <option value="invalid">Selecione uma mesa</option>
            {tempJson.map((index, key) => {
              return (
                <option value={index.id} key={key}>
                  mesa{key < 10 ? `0${key + 1}` : key + 1} - {index.sits}{' '}
                  cadeiras [{index.reserved ? 'Indisponivel' : 'Disponivel'}]
                </option>
              );
            })}
          </select>
          <section className="reserveButton-container">
            <button className="reservePrev-button">Anterior</button>
            <button className="reserveNext-button">Próximo</button>
          </section>
        </aside>
        <aside className="reserveSits-container">
          <h2>Convidados</h2>
          <section className="reserveChairs-container">
            {!selectedTable ? (
              <p>Selecione uma mesa disponivel antes de prosseguir...</p>
            ) : (
              Array.from({ length: (selectedTable.sits-1) }, (_, i) => (
                <input type="text" placeholder={`cadeira ${i+2 < 10 ? `0${i+2}` : i+2} (opcional)`} />
              ))
            )}
          </section>
        </aside>
      </section>
    </main>
  );
};

export default Reserve;
