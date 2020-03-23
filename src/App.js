/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import Chart from "chart.js";
import "./App.css";

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
    "23.03.2020"
  ];
  const toplam = [1, 1, 5, 6, 18, 47, 98, 191, 359, 670, 947, 1236,1529];
  const olumler = [0, 0, 0, 0, 0, 0, 1, 3, 4, 9, 21, 30,37];
  const hasta = [1, 1, 5, 6, 18, 47, 98, 191, 355, 661, 926, 1206,1492];
  const iyilesenler = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
  let lastUpdate = "22.03.2020 23:32";

  const oran = parseFloat(
    (olumler[olumler.length - 1] * 100.0) / toplam[toplam.length - 1]
  );

  let yuzde = oran.toString().substr(0, 4);

  yuzde = yuzde.replace(".", ",");

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
            pointHoverBackgroundColor: "orange"
          },
          {
            data: olumler,
            label: `Ölen`,
            borderColor: "red",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverBackgroundColor: "red"
          }
          // {
          //   data: iyilesenler,
          //   label: `İyileşen`,
          //   borderColor: "green",
          //   fill: false,
          //   borderWidth: 2,
          //   pointBorderWidth: 5,
          //   pointHoverBackgroundColor: "green"
          // }
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
            bottom: 10
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
      <div className='container'>
        <div className='row justify-content-center display-4 mt-3'>
          <div className='col-md-auto mb-3'>Türkiye'deki COVID-19 Verileri</div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-6'>
            <div className='card-counter info'>
              <span className='count-numbers'>{toplam[toplam.length - 1]}</span>
              <i className='fas fa-user'></i>
              <span className='count-name'>Toplam</span>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card-counter1 primary' id="hasta">
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

      <div
        className='container'
        id='chart'
        style={{
          height: "55vh",
          width: "100%",
          margin: "0 auto",
          color: "#666666",
          marginBottom: 0
        }}
      >
        <canvas id='corona-chart' />
      </div>
      {/* <div className='display-4'>Sağlık Bakanı'ndan Son Açıklama</div>
      <div className='display-4'>
        <i class='fas fa-angle-down ' id='down' />
      </div>
      <div
        className='container border border-light rounded p-3 mb-5 box-shadow'
        id='kaynak'
      >
        <div>
        <blockquote class="twitter-tweet"><p lang="tr" dir="ltr" data-width="1920px">BUGÜNE KADAR toplam 20.345 test yapıldı, 1.236 tanı kondu, hepsi yaşlı 30 hastamızı kaybettik. Hastalık ülkemizde yokken, “yok” dedik. Şimdi gün gün durumu açıklıyoruz. Şeffaflığımızla sizi tedbire de davet ediyoruz. Tedbirli olalım. Bu ülke, bu tehdide yenik düşmeyecek.</p>&mdash; Dr. Fahrettin Koca (@drfahrettinkoca) <a href="https://twitter.com/drfahrettinkoca/status/1241806899215061009?ref_src=twsrc%5Etfw">March 22, 2020</a></blockquote>
        </div>
    </div> */}
    </div>
  );
}

export default App;
