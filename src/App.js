import './App.css';
import React, { useEffect, useState } from 'react'
import { socket } from './socket';

function App() {

	const [bidAmount, setBidAmount] = useState(0);

	const [recentBids, setRecentBids] = useState([]);

	const [currentBid, setCurrentBid] = useState(0);

	const handleBidAmountChange = function(e) {
		setBidAmount(e.target.value);
	}

  	useEffect(() => {
    
		socket.on('connect', () => {
			console.log('Connected to Socket Server');
		});
		socket.on('disconnect', () => {
			console.log('Disconnected from socket Server');
		});

		socket.on('message', (message) => {
			console.log(`Received a message from ${message}`);
		});

		socket.on('auctionUpdate', (message) => {
			console.log(`Received a message from ${message}`);
		});

  	}, []);

  	const joinAuction = function(){
      	socket.emit('joinAuction', {'auction_id': '652a3440635466b2478f8fcd'});
  	}

	const submitBid = function(e) {
		e.preventDefault();
		socket.emit('newBid', {auction_id: '652a3440635466b2478f8fcd','bid_anount': bidAmount});
	}
	
  	return (
		<div className="App">
			<header className="App-header">
				<h1> Front-end App</h1>

				<button onClick={joinAuction}>Join Auction</button>

				<button onClick={joinAuction}>Leave Auction</button>

				<div>
					<form onSubmit={submitBid}>
						<label>Bid Amount</label>
						<input id='bid-amount' value={bidAmount} onChange={handleBidAmountChange}></input>
						<button type="submit">Submit</button>
					</form>
				</div>

				<div>
					<span> Current Bid: {currentBid}</span>
					<p>Recent Bids</p>
					<ul>
						{recentBids.map((bid) => {
							return <li>{bid.bidderName} - {bid.bidAmount}</li>
						})}
					</ul>
				</div>
			</header>
		</div>
  	);
}

export default App;
