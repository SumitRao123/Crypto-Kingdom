import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import LineChart from "./LineChart";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod]   = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });  
  //  console.log(data);
  console.log(coinHistory);
  const cryptoDetails = data?.data?.coin;
  // for(var key in cryptoDetails) console.log(key);
  //  console.log(cryptoDetails);
  //  console.log(cryptoDetails.Volume);
  if (isFetching) return <Loader/>;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails[Object.keys(cryptoDetails)[11]] && millify(cryptoDetails[Object.keys(cryptoDetails)[11]])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollars. Veiws Value
          Statistics,market cao and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)}  coinName ={cryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-container">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats if {cryptoDetails.name},, such as
              the base and quote currency, the rank, and trading volume
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-container">
               Other Statistics
            </Title>
            <p>
              An overview showing the stats of all Cryptocurrencies;
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
       <Col className='coin-desc-link'>
        <Row className="coin-desc">
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
          <Col className="coin-links">
                   <Title className="coin-details-heading" level={3}>
                     {cryptoDetails.name} Links
                   </Title>
                   {
                    cryptoDetails.links.map((link)=>(
                       <Row className="coin-link" key={link.name}>
                          <Title level={5} className='link-name'>
                            {link.type}
                          </Title>
                          <a href={link.url} target="_blank" rel='noreferrer'>
                            {link.name}
                          </a>
                       </Row>
                    ))
                   }
          </Col>
        </Row>
       </Col>
    </Col>
  );
};

export default CryptoDetails;
