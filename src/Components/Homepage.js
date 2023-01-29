import React from 'react'
import millify from "millify"
import { Typography,Row,Col,Statistic} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { NavLink } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'
// import { cryptoApi } from '../services/Cryptoapi'

const {Title}  = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  // console.log(data);
  const globalStats = data?.data?.stats;
  if(isFetching) return <Loader/>;
  // console.log(globalStats);
  return (
    <>
          <Title level={2} className='heading'> Global Crypto Stats</Title>
          <Row>
            <Col span={12}> <Statistic title="Total Cryptocurrencies" value={globalStats.total}></Statistic> </Col>
            <Col span={12}> <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic> </Col>
            <Col span={12}> <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}></Statistic> </Col>
            <Col span={12}> <Statistic title="Total 24th Volume" value={millify(globalStats.total24hVolume)}></Statistic> </Col>
            <Col span={12}> <Statistic title="Total Market" value={millify(globalStats.totalMarkets)}></Statistic> </Col>
          </Row>
          <div className="home-heading-container">
            <Title level={2} className="home-title" > Top 10 Cryptocurrencies in  the world </Title>
            <Title level={3} className="show-more"><NavLink to="/cryptocurrencies">Show More</NavLink></Title>
          </div>
          <Cryptocurrencies simplified/>
          <div className="home-heading-container">
              <Title level={2} className="home-title">Latest Crypto News</Title>
              <Title level={2} className="show-more"><NavLink to="/news">Show More</NavLink></Title>
          </div>
          <News simplified />

    </>
  )
}

export default Homepage;