import React, {useState, useEffect} from 'react'
import millify  from 'millify'
import { NavLink } from 'react-router-dom'
import { Card,Row,Col,Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'
const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100 ; 
  const {data : cryptosList, isFetching } = useGetCryptosQuery(count);
  const[cryptos,setCryptos ] = useState([]);
  // console.log(cryptos);
  const [searchTerm,setSearchTerm] = useState('');
  useEffect(()=>{
    //  setCryptos(cryptosList?.data?.coins);
     const filterData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
     setCryptos(filterData)
    },[cryptosList,searchTerm])
  if(isFetching) return  <Loader/>
  
  return (
    <>
        {
          !simplified && (
            <div className="search-crypto">
              <Input placeholder='Search  Cryptocurrencies' onChange={(e)=> setSearchTerm(e.target.value)}></Input>
            </div>
        )}
       
      <Row gutter={[32,32]} className= "crypto-card-container">
        {
          cryptos?.map((currency)=>(
             <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                <NavLink to={`/crypto/${currency.uuid}`}>
                      <Card  title={`${currency.rank}. ${currency.name}`} 
                       extra={<img className='crypto-image' alt='coins' src={currency.iconUrl}></img>}
                       hoverable
                      >
                             <p> Price : {millify(currency.price)}</p>
                             <p>Market Cap : {millify(currency.marketCap)}</p>
                             <p>Daily Changes : {millify(currency.change)}</p>
                      </Card>
                </NavLink>    
             </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies