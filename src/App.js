import React from "react";
import Chart from "chart.js";

function App() {
  const labels = [
    "11.03.2020",
    "12.03.2020",
    "13.03.2020",
    "14.03.2020",
    "15.03.2020",
    "16.03.2020",
    "17.03.2020",
    "18.03.2020",
    "19.03.2020",
    "20.03.2020",
    "21.03.2020",
    "22.03.2020",
    "23.03.2020",
    "24.03.2020",
    "25.03.2020"
  ];

  const toplam = [
    1,
    1,
    5,
    6,
    18,
    47,
    98,
    191,
    359,
    670,
    947,
    1236,
    1529,
    1872,
    2433
  ];
  const olumler = [0, 0, 0, 0, 0, 0, 1, 3, 4, 9, 21, 30, 37, 44, 59];
  const hasta = [
    1,
    1,
    5,
    6,
    18,
    47,
    98,
    191,
    355,
    661,
    926,
    1206,
    1492,
    1828,
    2374
  ];
  const iyilesenler = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26];
  let lastUpdate = "25.03.2020 23:54";

  const oran = parseFloat(
    (olumler[olumler.length - 1] * 100.0) / toplam[toplam.length - 1]
  );

  let yuzde = oran.toString().substr(0, 4);
  yuzde = yuzde.replace(".", ",");

  const reversedLabels = labels.map(item => item).reverse();
  const reversedToplam = toplam.map(item => item).reverse();
  const reversedHasta = hasta.map(item => item).reverse();
  const reversedIyilesen = iyilesenler.map(item => item).reverse();
  const reversedOlum = olumler.map(item => item).reverse();

  window.onload = function() {
    new Chart(document.getElementById("corona-chart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: toplam,
            label: `Toplam`,
            borderColor: "#26c6da",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 5,
            pointBorderColor: "#26c6da",
            pointHoverBackgroundColor: "26c6da"
          },
          {
            hitRadius: false,
            data: hasta,
            label: `Hasta`,
            borderColor: "orange",
            borderWidth: 2,
            fill: false,
            pointBorderWidth: 5,
            pointBorderColor: "orange",
            pointHoverBackgroundColor: "orange"
          },
          {
            data: olumler,
            label: `Ölen`,
            borderColor: "#ef5350",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverBackgroundColor: "#ef5350"
          },
          {
            data: iyilesenler,
            label: `İyileşen`,
            borderColor: "#66bb6a",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverBackgroundColor: "#66bb6a"
          }
        ]
      },
      options: {
        animation: {
          duration: 1250,
          easing: "linear"
        },
        title: {
          display: true,
          fontSize: 20,
          fontStyle: "bold",
          text: [`Son Güncelleme: ${lastUpdate}`]
        },
        layout: {
          padding: {
            bottom: 0
          }
        },
        legend: {
          align: "center",
          onClick: e => e.stopPropagation()
        },
        tooltips: {
          mode: "point",
          cornerRadius: 0,
          titleAlign: "center",
          footerAlign: "center"
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                autoSkip: true
              },
              scaleLabel: {
                display: false,
                labelString: "Tarih"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Kişi Sayısı"
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  };

  return (
    <div className='App'>
      <div className="container">
        
      </div>
      <div className="container">
      <div className='row justify-content-center display-3 mt-2'>
        <div className='col-md-auto mb-3'>Türkiye'de COVID-19</div>
      </div>
      </div>
      <div className='container border border-light rounded pt-3 mb-3 mt-3 box-shadow'>
        <div className='row mb-3'>
          <div className='col-md-6'>
            <div className='card-counter info'>
              <span className='count-numbers'>{toplam[toplam.length - 1]}</span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Toplam</span>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card-counter1 primary' id='hasta'>
              <span className='count-numbers'>
                {toplam[toplam.length - 1] - olumler[olumler.length - 1]}
              </span>
              <i className='fa fa-procedures'></i>
              <span className='count-name'>Hasta</span>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card-counter danger'>
              <span className='count-numbers'>
                {olumler[olumler.length - 1]}
              </span>
              <i className='fas fa-skull'></i>
              <span className='count-name'>Ölüm</span>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card-counter percent'>
              <span className='count-numbers'>{yuzde}</span>
              <i className='fas fa-percent'></i>
              <span className='count-name' id='oranSpan'>
                Ölüm Oranı
              </span>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card-counter success'>
              <i className='fa fa-medkit'></i>
              <span className='count-numbers'>
                {iyilesenler[iyilesenler.length - 1]}
              </span>
              <span className='count-name'>İyileşen</span>
            </div>
          </div>
        </div>
      </div>
      <div className='container box-shadow border border-light rounded p-3 mb-3' id='chart' style={{
          height: "55vh",
          width: "100%"
        }}>
        <canvas id='corona-chart' />
      </div>
      <div className='container border border-light rounded p-3 mb-5 box-shadow' id='kaynak'>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Tarih</th>
                <th scope='col'>Vaka</th>
                <th scope='col'>Hasta</th>
                <th scope='col'>Ölüm</th>
                <th scope='col'>İyileşen</th>
                <th scope='col'>Ölüm Oranı</th>
              </tr>
            </thead>
            <tbody>
              {reversedLabels.map((item, index) => {
                let oran = parseFloat(
                  (reversedOlum[index] * 100) / reversedToplam[index]
                );
                let yuzde = oran.toString().substr(0, 4);
                return (
                  <tr key={Math.random()}>
                    <td>{item}</td>
                    <td>
                      {reversedToplam[index]}
                      <b>
                        {index !== reversedLabels.length - 1
                          ? "(+" +
                            (reversedToplam[index] -
                              reversedToplam[index + 1]) +
                            ")"
                          : ""}
                      </b>
                    </td>
                    <td>
                      {reversedHasta[index]}
                      <b>
                        {reversedHasta[index] !== 0 &&
                        index !== reversedLabels.length - 1
                          ? "(+" +
                            (reversedHasta[index] - reversedHasta[index + 1]) +
                            ")"
                          : ""}
                      </b>
                    </td>
                    <td>
                      {reversedOlum[index] !== 0 &&
                      index !== reversedLabels.length - 1
                        ? reversedOlum[index]
                        : "-"}
                      <b style={{ color: "red" }}>
                        {reversedOlum[index] !== 0 &&
                        index !== reversedLabels.length - 1
                          ? "(+" +
                            (reversedOlum[index] - reversedOlum[index + 1]) +
                            ")"
                          : ""}
                      </b>
                    </td>
                    <td>
                      {reversedIyilesen[index] !== 0 &&
                      index !== reversedLabels.length - 1
                        ? reversedIyilesen[index]
                        : "-"}
                      <b style={{ color: "green" }}>
                        {reversedIyilesen[index] !== 0 &&
                        index !== reversedLabels.length - 1
                          ? "(+" +
                            (reversedIyilesen[index] -
                              reversedIyilesen[index + 1]) +
                            ")"
                          : ""}
                      </b>
                    </td>
                    <td>{reversedOlum[index] === 0 ? "-" : "%" + yuzde}</td>
                  </tr>
                );
              })}
              <tr className='table-info'>
                <th>{labels.length - 1} Günlük Toplam</th>
                <th>{toplam[toplam.length - 1]}</th>
                <th>{hasta[hasta.length - 1]}</th>
                <th>{olumler[olumler.length - 1]}</th>
                <th>{iyilesenler[iyilesenler.length - 1]}</th>
                <th>%{yuzde}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
