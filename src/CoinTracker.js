import React, { memo, useEffect, useState } from 'react';
import style from './CoinTracker.module.css';

const MemorizedSelectBox = memo(
  ({ coins, selectCoinChange }) => {
    return (
      <div className={style.selectBox}>
        <label htmlFor={style.coinList}>Coins</label>
        <select id={style.coinList} onChange={selectCoinChange}>
          {coins.map((item, idx) => {
            return (
              <option value={idx} key={item.id}>
                ({item.symbol}) {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
  ({ prevCoins, prevFnc }, { nextCoins, nextFnc }) =>
    JSON.stringify(prevCoins) === JSON.stringify(nextCoins)
);

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState(0);
  const [usd, setUsd] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://api.coinpaprika.com/v1/tickers')
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setLoading(false);
        });
    }, 2000);
  }, []);

  const onChange = (e) => {
    let dollar = e.target.value;
    if (dollar.length > 1 && dollar[0] === '0') {
      setUsd(dollar.slice(1));
    } else {
      setUsd(e.target.value);
    }
  };

  const selectCoinChange = (e) => {
    setCoin(e.target.value);
  };

  return (
    <div>
      <h1 className={style.title}>The Coins!</h1>
      <hr></hr>
      {loading ? (
        <div className={style.loadingBox}>
          <img
            className={style.loadingBox_Img}
            src="https://m.media-amazon.com/images/I/81vOF2Rr2tS._AC_UF894,1000_QL80_.jpg"
            alt="The Coin"
          />
          <strong className={style.loadingBox_Txt}>Loading...</strong>
        </div>
      ) : (
        <div className={style.coinsBox}>
          <MemorizedSelectBox
            coins={coins}
            selectCoinChange={selectCoinChange}
          />

          <div className={style.dollarBox}>
            <div>
              <label htmlFor={style.usdInput}>$</label>
              <input
                onChange={onChange}
                id={style.usdInput}
                type="number"
                value={usd}
              />
            </div>

            <div>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="name">Name</label>
                    </th>
                    <td>
                      <input
                        id="name"
                        type="text"
                        disabled={true}
                        value={coins[coin].name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="price">Price</label>
                    </th>
                    <td>
                      <input
                        id="price"
                        type="number"
                        disabled={true}
                        value={coins[coin].quotes.USD.price}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="symbol">{coins[coin].symbol}</label>
                    </th>
                    <td>
                      <input
                        id="symbol"
                        type="number"
                        disabled={true}
                        value={usd / coins[coin].quotes.USD.price}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinTracker;
