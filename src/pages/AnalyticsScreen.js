import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'

const chartOptions = {
  series: [
    {
      name: 'Online Customers',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: 'Store Customers',
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
}
const AnalyticsScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const themeReducer = useSelector((state) => state.ThemeReducer.mode)
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? {
                      ...chartOptions.options,
                      theme: { mode: 'dark' },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: 'light' },
                    }
              }
              series={chartOptions.series}
              type='line'
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? {
                      ...chartOptions.options,
                      theme: { mode: 'dark' },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: 'light' },
                    }
              }
              series={chartOptions.series}
              type='line'
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? {
                      ...chartOptions.options,
                      theme: { mode: 'dark' },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: 'light' },
                    }
              }
              series={chartOptions.series}
              type='line'
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? {
                      ...chartOptions.options,
                      theme: { mode: 'dark' },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: 'light' },
                    }
              }
              series={chartOptions.series}
              type='line'
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default AnalyticsScreen
