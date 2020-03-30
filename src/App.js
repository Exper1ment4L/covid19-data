import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function App() {
  const [datas, setDatas] = useState([]);
  const [history, setHistory] = useState();

  // Güncel Veriler
  useEffect(() => {
    fetch("https://corona.lmao.ninja/countries/turkey")
      .then(res => res.json())
      .then(data => {
        setDatas(data);
      });
  }, []);

  // Geçmiş Veriler
  useEffect(() => {
    fetch("https://corona.lmao.ninja/v2/historical/turkey")
      .then(res => res.json())
      .then((data, index) => {
        setHistory(data.timeline);
      });
  }, []);

  const tableData = [
    [
      "Tarih",
      "Toplam Vaka",
      "Yeni Vaka",
      "Toplam Ölüm",
      "Bugünkü Ölüm",
      "Toplam İyileşen",
      "Bugünkü İyileşen",
      "Ölüm Oranı"
    ]
  ];

  const chartData = [["Tarih", "Toplam"]];

  const setTarihFormat = tarih => {
    let formatted;
    let month;
    switch (tarih.substr(0, 1)) {
      case "1":
        month = "Ocak";
        break;
      case "2":
        month = "Şubat";
        break;
      case "3":
        month = "Mart";
        break;
      case "4":
        month = "Nisan";
        break;
      case "5":
        month = "Mayıs";
        break;
      case "6":
        month = "Haziran";
        break;
      case "7":
        month = "Temmuz";
        break;
      case "8":
        month = "Ağustos";
        break;
      case "9":
        month = "Eylül";
        break;
      case "10":
        month = "Ekim";
        break;
      case "11":
        month = "Kasım";
        break;
      case "12":
        month = "Aralık";
        break;

      default:
        break;
    }

    if (tarih.length === 7) {
      formatted = tarih.substr(2, 2) + " " + month + " 2020";
    } else {
      formatted = tarih.substr(2, 1) + " " + month + " 2020";
    }
    return formatted;
  };

  if (history !== undefined) {
    const tarih = Object.keys(history.cases)
      .map(item => setTarihFormat(item))
      .reverse();
    const toplam = Object.values(history.cases)
      .map(item => item)
      .reverse();
    const olum = Object.values(history.deaths)
      .map(item => item)
      .reverse();
    const iyilesen = Object.values(history.recovered)
      .map(item => item)
      .reverse();

    for (let index = 0; index < 19; index++) {
      let vakaArtis = toplam[index] - toplam[index + 1];
      let olumArtis = olum[index] - olum[index + 1];
      let iyiArtis = iyilesen[index] - iyilesen[index + 1];

      let oran = parseFloat((olum[index] * 100) / toplam[index]);
      let yuzde = oran.toString().substr(0, 4);
      yuzde = yuzde.replace(".", ",");

      tableData.push([
        { v: index, f: tarih[index] },
        toplam[index],
        !isNaN(vakaArtis) && vakaArtis !== 0
          ? { v: vakaArtis, f: "+" + vakaArtis }
          : 0,
        olum[index],
        !isNaN(olumArtis) && olumArtis !== 0
          ? { v: olumArtis, f: "+" + olumArtis }
          : 0,
        iyilesen[index],
        !isNaN(iyiArtis) && iyiArtis !== 0
          ? { v: iyiArtis, f: "+" + iyiArtis }
          : 0,
        { v: yuzde, f: "%" + yuzde }
      ]);

      chartData.push([tarih[18 - index].substr(0, 6), toplam[18 - index]]);
    }
  }

  const yogunBakim = datas.critical;
  const hasta = datas.active;

  let updated = new Date(datas.updated);
  let lastUpdate = updated.toLocaleString();

  const oran = parseFloat((datas.deaths * 100.0) / datas.cases);
  let yuzde = oran.toString().substr(0, 4);
  yuzde = yuzde.replace(".", ",");

  const options = {
    legend: "none",
    chartArea: {
      left: 100,
      top: 30,
      bottom: 50,
      right: 30,
      width: "100%",
      height: "100%"
    },
    smoothLine: true,
    lineSize: 4,
    pointsVisible: true,
    vAxis: {
      title: "Vaka Sayısı",
      viewWindowMode: "explicit",
      viewWindow: {
        min: 0
      },
      gridlines: {
        count: 5
      }
    }
  };

  return (
    <div className='App'>
      <div className='container'>
        <div className='row justify-content-center display-3 mt-2'>
          <div className='col-md-auto mb-3'>COVID-19 Türkiye Verileri</div>
        </div>
        <div className='row justify-content-center h5 mt-2'>
          <div className='col-md-auto mb-3'>
            Son Güncelleme:{" "}
            {lastUpdate !== "Invalid Date" ? lastUpdate : (lastUpdate = "")}
          </div>
        </div>
      </div>
      <div className='container border border-light rounded pt-3 mb-5 mt-3 box-shadow'>
        <div className='row mb-3'>
          <div className='col-sm-12 col-md-6 col-xl-6'>
            <div className='card-counter bugun'>
              <span className='count-numbers'>{datas.todayCases}</span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Bugünkü Vaka</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-6'>
            <div className='card-counter bugun'>
              <span className='count-numbers'>{datas.todayDeaths}</span>
              <i className='fas fa-heart-broken'></i>
              <span className='count-name'>Bugünkü Ölüm</span>
            </div>
          </div>
        </div>

        <hr />
        <div className='row mb-3'>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter info'>
              <span className='count-numbers'>{datas.cases}</span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Toplam Vaka</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter primary' id='hasta'>
              <span className='count-numbers'>{hasta}</span>
              <i className='fa fa-procedures'></i>
              <span className='count-name'>Şuanki Hasta</span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter percent'>
              <span className='count-numbers'>{yuzde}</span>
              <i className='fas fa-percent'></i>
              <span className='count-name' id='oranSpan'>
                Ölüm Oranı
              </span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4 '>
            <div className='card-counter yogun'>
              <span className='count-numbers'>{yogunBakim}</span>
              <i className='fas fa-heartbeat'></i>
              <span className='count-name'>Yoğun Bakım</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter success'>
              <i className='fa fa-medkit'></i>
              <span className='count-numbers'>{datas.recovered}</span>
              <span className='count-name'>İyileşenler</span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter danger'>
              <span className='count-numbers'>{datas.deaths}</span>
              <i className='fas fa-heart-broken'></i>
              <span className='count-name'>Ölüm</span>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row justify-content-center display-4 mt-2'>
          <div className='col-md-auto mb-3'>Vaka Artış Grafiği</div>
        </div>
      </div>

      <div
        className='container box-shadow border border-light rounded p-3 mb-5'
        id='chart'
        style={{
          height: "500px"
        }}
      >
        <Chart
          chartType='LineChart'
          data={chartData}
          options={options}
          width='100%'
          height='100%'
        />
      </div>
      <div className='container'>
        <div className='row justify-content-center display-4 mt-2'>
          <div className='col-md-auto mb-3'>Günlük Veri Tablosu</div>
        </div>
      </div>

      <div className='container border border-light rounded p-3 mb-5 box-shadow'>
        <Chart
          chartType='Table'
          data={tableData}
          options={{
            width: "100%"
          }}
        />
      </div>
      <div id='scroll'>
        <span></span>
      </div>
      <a
        href='https://github.com/Exper1ment4L/covid19-data'
        target='_blank'
        rel='noopener noreferrer'
      >
        <i className='fab fa-github mb-3' />
      </a>
    </div>
  );
}

export default App;
