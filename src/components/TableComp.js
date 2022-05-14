import React, { useState,useEffect } from 'react'
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';
import '../App.css'


const TableComp = () => {
    //const bidURL = "https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=10"

    //https://api.binance.com/api/v3/exchangeInfo
    const [bids, Setbids] = useState([]);
    const [asks, Setasks] = useState([]);
    const [symbols, SetSymbols] = useState([]);
    const [symbol, SetSymbol] = useState("BNBBTC");


    // TO GET ASK_PRICE & ASK_QUANTITY AND BID_PRICE & BID_QUANTITY oF FIRST 10 ROWS
    useEffect(() => {
    axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`).then((data) => {
        
        Setbids(data.data.bids);
        Setasks(data.data.asks);
    }).catch((err) => {
        console.log(err);
    })
    }, [bids,asks])


    // TO GET THE LIST OF SYMBOLS OF FIRST 100 SYMBOLS
    useEffect(() => {
      axios.get("https://api.binance.com/api/v3/exchangeInfo").then((data)=>{
          SetSymbols([]);
          for(let i=0; i<100 ; i++){
           
            SetSymbols((prev)=>[...prev,data.data.symbols[i].symbol])
          }
      })
    .catch((err)=>{
        console.log(err);
    })
    }, [])

  return (
    <div>
        <h3>Order Book for {symbol}</h3>
        <div className="select">
         <div>
         
        <Form.Select name='btc' value={symbol} onChange={(e)=>{SetSymbol(e.target.value)}}>
            {symbols.map((sym)=>{
                return <option key={sym} value={sym}>{sym}</option>
            })}
        </Form.Select>
        <span>Select the CRYPTO from the first top 100 on the List</span>
        </div>
        </div>
        <div className='tables'>
        <div className='table'>
        <Table  striped bordered hover variant="dark">
            <tbody>
       
            <tr>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Bid Price</th>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Bid Quantity</th>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Total Price</th>
            </tr>
          
            {bids.map((bid) => {
                return(
                    <tr key={bid}>
                    <td style={{color:"rgb(224, 62, 62)"}} >{bid[0]}</td>
                    <td style={{color:"rgb(189, 255, 255)"}}>{bid[1]}</td>
                    <td style={{color:"rgb(189, 255, 255)"}}>{(bid[0]*bid[1]).toFixed(5) }</td>
                    </tr>
                )
            })}
            
            </tbody>
        </Table>
        </div>
        <div className='table'>
        <Table className='table' striped bordered hover variant="dark">
            <tbody>
            <tr>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Ask Price</th>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Ask Quantity</th>
                <th style={{color:"rgba(150, 180, 192, 0.775)"}}>Total Price</th>
            </tr>
            
            {asks.map((ask) => {
                return(
                    <tr key={ask}>
                    <td style={{color:"rgb(224, 62, 62)"}}>{ask[0]}</td>
                    <td style={{color:"rgb(189, 255, 255)"}}>{ask[1]}</td>
                    <td style={{color:"rgb(189, 255, 255)"}}>{(ask[0]*ask[1]).toFixed(5) }</td>
                    </tr>
                )
            })}
            
            </tbody>
        </Table>
        </div>
        </div>
    </div>
  )
}


export default TableComp;