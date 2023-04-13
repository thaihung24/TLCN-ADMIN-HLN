import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav, Card } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { callChatGPT } from '../actions/chatGPTActions'
import { CLEAR_ERRORS } from '../constants/chatgptConstants'
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
  const chatGPT = useSelector((state) => state.chatGPT)
  const { loading, messages, error } = chatGPT
  const themeReducer = useSelector((state) => state.ThemeReducer.mode)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  useEffect(() => {
    if (!userInfo || !userInfo.data.user.isAdmin) {
      history.push('/login')
    }
    if (error) {
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, history, userInfo, error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(callChatGPT(input))
    setOutput(messages)
    setInput('')
  }
  return (
    <>
      {loading && <Loader />}
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
        <h1>{output}</h1>
      </div>
    </>
  )
}
export default AnalyticsScreen
