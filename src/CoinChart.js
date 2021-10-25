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

  Chart.register(...registerables)

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
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              distribution: 'linear',
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 7,
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              grid: {
                color: 'rgba(53, 56, 59, 0.8)',
                borderWidth: 0,
              },
            },
          },
        },
      })

      // let parentEventHandler = Chart.prototype._eventHandler
      // Chart.prototype._eventHandler = function () {
      //   let ret = parentEventHandler.apply(this, arguments)

      //   let x = arguments[0].x
      //   let y = arguments[0].y
      //   this.clear()
      //   this.draw()
      //   let yScale = this.scales.y
      //   this.ctx.beginPath()
      //   this.ctx.moveTo(x, yScale.getPixelForValue(yScale.max, 0))
      //   this.ctx.strokeStyle = '#ff0000'
      //   this.ctx.lineTo(x, yScale.getPixelForValue(yScale.min, 0))
      //   this.ctx.stroke()

      //   return ret
      // }

      return () => {
        myChart.destroy()
      }
    }
  })
  return (
    <div>
      <canvas ref={chartRef} id='myChart'></canvas>
    </div>
  )
}

export default CoinChart
