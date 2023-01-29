import React, { useState } from 'react'
import { Select,Typography,Row,Col,Avatar, Card, Input} from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
const {Text, Title}  = Typography;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
const {Option} = Select 
const News = ({simplified}) => {
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency');
  const {data : cryptoNews } = useGetCryptoNewsQuery({newsCategory,count: (simplified) ? 6 : 12 }); 
  // console.log(cryptoNews);
  const {data} = useGetCryptosQuery(10);
  
  if(!cryptoNews?.value) return <Loader/>
  return (
     <Row gutter={[24,24]}>
          
          {
           
            !simplified && (
               <Col span={24}>
                   <Select 
                      className='select-news'
                      placeholder= "select a Crypto"
                      optionFilterProp='children'
                      onChange={(value)=> setNewsCategory(value) }
                    filterOption = {(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                    <Option value="Cryptocurrency">Cryptocurrency</Option>
                     {data?.data?.coins.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}

                   </Select>
               </Col> 
            )
          }
          {
            
            cryptoNews.value.map((news,i)=>(
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card hoverable className='news-card'>
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className='news-title' level={4}>{news.name}</Title> 
                        <img style={{maxWidth : '200px',maxHeight : '100px'}}  src={news?.image?.thumbnail?.contentUrl || demoImage } alt="new"></img>
                     </div>
                      <p>
                         {
                          news.description > 100 ? `${news.description.substring(0,100)}...` : news.description
                         }
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage }></Avatar>
                          <Text className='provider-name'>{news.provider[0]?.name
                          }</Text>
                        </div>
                          <Text > { moment(news.datePublished).startOf('ss').fromNow()}</Text>
                      </div>
                    </a>
                  </Card>
                </Col>
            ))
          }
       </Row>


  )
}

export default News