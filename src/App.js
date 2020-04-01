import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Ellipsis, Default } from "react-awesome-spinners";

function App() {
  const [datas, setDatas] = useState([]);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);

  // Güncel Veriler
  useEffect(() => {
    fetch("https://corona.lmao.ninja/countries/turkey")
      .then(res => res.json())
      .then(data => {
        setDatas(data);
        setLoading(false);
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

  const chartData = [["Tarih", "Toplam Vaka"]];
  const chart2Data = [["Tarih", "Günlük Vaka"]];
  const chart3Data = [["Tarih", "Günlük Ölüm"]];

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
    const startIndex = tarih.indexOf("10 Mart 2020");

    for (let index = 0; index < startIndex; index++) {
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

      chartData.push([
        tarih[startIndex - index - 1].substr(0, 6),
        toplam[startIndex - index - 1]
      ]);
      chart2Data.push([
        tarih[startIndex - index - 1].substr(0, 6),
        toplam[startIndex - 1 - index] - toplam[startIndex - index]
      ]);
      chart3Data.push([
        tarih[startIndex - index - 1].substr(0, 6),
        olum[startIndex - 1 - index] - olum[startIndex - index]
      ]);
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
      top: 50,
      bottom: 100,
      right: 30,
      width: "100%",
      height: "100%"
    },
    smoothLine: true,
    lineSize: 4,
    pointsVisible: true,
    vAxis: {
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
            {!loading ? "Son Güncelleme: " + lastUpdate : <Ellipsis />}
          </div>
        </div>
      </div>
      <div className='container border border-light rounded pt-3 mb-3 mt-3 '>
        <div className='row mb-3'>
          <div className='col-sm-12 col-md-6 col-xl-6'>
            <div className='card-counter bugun'>
              <span className='count-numbers'>
                {!loading ? (
                  datas.todayCases === 0 ? (
                    "Açıklanmadı"
                  ) : (
                    datas.todayCases
                  )
                ) : (
                  <Ellipsis color='white' />
                )}
              </span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Bugünkü Vaka</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-6'>
            <div className='card-counter bugun'>
              <span className='count-numbers'>
                {!loading ? (
                  datas.todayDeaths === 0 ? (
                    "Açıklanmadı"
                  ) : (
                    datas.todayDeaths
                  )
                ) : (
                  <Ellipsis color='white' />
                )}
              </span>
              <i className='fas fa-heart-broken'></i>
              <span className='count-name'>Bugünkü Ölüm</span>
            </div>
          </div>
        </div>

        <hr />
        <div className='row mb-3'>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter info'>
              <span className='count-numbers'>
                {!loading ? datas.cases : <Ellipsis color='white' />}
              </span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Toplam Vaka</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter primary' id='hasta'>
              <span className='count-numbers'>
                {!loading ? hasta : <Ellipsis color='white' />}
              </span>
              <i className='fa fa-procedures'></i>
              <span className='count-name'>Şuanki Hasta</span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter percent'>
              <span className='count-numbers'>
                {!loading ? yuzde : <Ellipsis color='white' />}
              </span>
              <i className='fas fa-percent'></i>
              <span className='count-name' id='oranSpan'>
                Ölüm Oranı
              </span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4 '>
            <div className='card-counter yogun'>
              <span className='count-numbers'>
                {!loading ? yogunBakim : <Ellipsis color='white' />}
              </span>
              <i className='fas fa-heartbeat'></i>
              <span className='count-name'>Yoğun Bakım</span>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter success'>
              <i className='fa fa-medkit'></i>
              <span className='count-numbers'>
                {!loading ? datas.recovered : <Ellipsis color='white' />}
              </span>
              <span className='count-name'>İyileşenler</span>
            </div>
          </div>

          <div className='col-sm-12 col-md-6 col-xl-4'>
            <div className='card-counter danger'>
              <span className='count-numbers'>
                {!loading ? datas.deaths : <Ellipsis color='white' />}
              </span>
              <i className='fas fa-heart-broken'></i>
              <span className='count-name'>Ölüm</span>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row justify-content-center display-4 mt-2 '>
          <div className='col-md-12 mt-3 mb-5'>Toplam Vaka</div>

          <div className='col justify-content-center mt-2'>
            <Chart
              chartType='LineChart'
              data={chartData}
              options={options}
              width='100%'
              height='500px'
              loader={<Default />}
            />
          </div>
        </div>
        <div className='row justify-content-center display-4 mt-3 '>
          <div className='col-md-12 mt-3 mb-5'>Günlük Vaka</div>

          <div className='col-md-12 justify-content-center mt-2'>
            <Chart
              chartType='ColumnChart'
              data={chart2Data}
              options={options}
              width='100%'
              height='500px'
              loader={<Default />}
            />
          </div>
        </div>
        <div className='row justify-content-center display-4 mb-3 mt-3 '>
          <div className='col-md-12 mt-3 mb-5'>Günlük Ölüm</div>

          <div className='col justify-content-center mt-2'>
            <Chart
              chartType='ColumnChart'
              data={chart3Data}
              options={options}
              width='100%'
              height='500px'
              loader={<Default />}
            />
          </div>
        </div>
        <div className='row justify-content-center display-4 mt-2 mb-5 '>
          <div className='col-md-12 mt-3 mb-5'>Günlük Veri Tablosu</div>

          <div className='col justify-content-center pb-5 mt-1'>
            <Chart
              chartType='Table'
              data={tableData}
              options={{
                width: "100%",
                height: "500px"
              }}
              loader={<Default />}
            />
          </div>
        </div>
      </div>
      <div id='scroll'>
        <span></span>
      </div>

      <a
        href='https://github.com/Exper1ment4L/covid19-data'
        className='github-corner'
        aria-label='View source on GitHub'
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          width='60'
          height='60'
          viewBox='0 0 250 250'
          style={{
            fill: "#151513",
            color: "#fff",
            position: "absolute",
            top: 0,
            border: 0,
            right: 0
          }}
          aria-hidden='true'
        >
          <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z'></path>
          <path
            d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
            fill='currentColor'
            style={{ transformOrigin: "130px 106px" }}
            className='octo-arm'
          ></path>
          <path
            d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
            fill='currentColor'
            className='octo-body'
          ></path>
        </svg>
      </a>
    </div>
  );
}

export default App;
