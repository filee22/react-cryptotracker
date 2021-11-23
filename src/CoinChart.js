import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import './CoinChart.css'

function CoinChart({
  priceData,
  timeData,
  name,
  pricePerc24h,
  priceCondition,
  percSwitch,
}) {
  const chartRef = useRef()

  // Chart.register(...registerables)

  useEffect(() => {
    if (chartRef && chartRef.current) {
      var ctx = document.getElementById('myChart').getContext('2d')

      var gradientGreen = ctx.createLinearGradient(0, 0, 0, 300)
      gradientGreen.addColorStop(0, 'rgba(129, 201, 149, 0.35)')
      gradientGreen.addColorStop(1, 'rgba(100, 100, 0, 0)')
      var gradientRed = ctx.createLinearGradient(0, 0, 0, 300)
      gradientRed.addColorStop(0, 'rgba(242, 139, 130, 0.35)')
      gradientRed.addColorStop(1, 'rgba(100, 100, 0, 0)')

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeData,
          datasets: [
            {
              label: `${name} price`,
              lineTension: 0,
              fill: true,
              data: priceData,
              parsing: {
                yAxisKey: 'y',
                xAxisKey: 't',
              },
              backgroundColor: percSwitch < 0 ? gradientRed : gradientGreen,
              borderColor:
                percSwitch < 0 ? 'rgb(242, 139, 130)' : 'rgb(129, 201, 149)',
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          lineHeightAnnotation: {
            always: true,
            hover: false,
            lineWeight: 1.5,
          },
          animation: {
            duration: 2000,
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            displayColors: false,
            backgroundColor: 'rgb(39, 40, 43)',
            borderWidth: 1,
            borderColor: 'rgb(154, 160, 166)',

            callbacks: {
              title: function (item, everything) {
                // console.log(item)
                let time = item[0].xLabel

                return time
              },
              label: function (item, everything) {
                // console.log(item)
                // console.log(everything)

                let price = item.yLabel

                let priceFor =
                  (price < 10 && price >= 0.01) ||
                  (price > -10 && price <= -0.01)
                    ? price.toLocaleString(undefined, {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      })
                    : (price < 0.01 && price >= 0.001) ||
                      (price > -0.01 && price <= -0.001)
                    ? price.toLocaleString(undefined, {
                        minimumFractionDigits: 6,
                        maximumFractionDigits: 6,
                      })
                    : (price < 0.001 && price >= 0.0001) ||
                      (price > -0.001 && price <= -0.0001)
                    ? price.toLocaleString(undefined, {
                        minimumFractionDigits: 7,
                        maximumFractionDigits: 7,
                      })
                    : price < 0.0001 && price > -0.0001
                    ? price.toLocaleString(undefined, {
                        minimumFractionDigits: 8,
                        maximumFractionDigits: 8,
                      })
                    : price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })

                let label = `Price: ` + '$' + priceFor
                return label
              },
            },
          },
          scales: {
            xAxes: [
              {
                distribution: 'linear',
                gridLines: {
                  display: false,
                },
                ticks: {
                  maxTicksLimit: 5,
                  maxRotation: 0,
                  minRotation: 0,
                  beginAtZero: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgba(53, 56, 59, 0.8)',
                  drawBorder: false,
                },
              },
            ],
          },
          customLine: {
            color: 'rgb(154, 160, 166)',
          },
        },
        plugins: [
          {
            beforeEvent: function (chart, e) {
              //console.log("Before => ", chart);
              if (
                e.type === 'mousemove' &&
                e.x >= e.chart.chartArea.left &&
                e.x <= e.chart.chartArea.right
              ) {
                chart.options.customLine.x = e.x
              }
            },
            afterDraw: function (chart, easing) {
              //console.log("After => ", chart, chart.options.customLine);

              var ctx = chart.chart.ctx
              var chartArea = chart.chartArea
              var x = chart.options.customLine.x

              if (!isNaN(x)) {
                ctx.save()
                ctx.beginPath()
                ctx.setLineDash([3, 3])
                ctx.strokeStyle = chart.options.customLine.color
                ctx.moveTo(chart.options.customLine.x, chartArea.bottom)
                ctx.lineTo(chart.options.customLine.x, chartArea.top)
                ctx.stroke()
                ctx.restore()
              }
            },
          },
        ],
      })

      return () => {
        myChart.destroy()
      }
    }
  })
  return (
    <div className='chart-style'>
      <canvas ref={chartRef} id='myChart'></canvas>
    </div>
  )
}

export default CoinChart
