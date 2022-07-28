import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import Loader from "../components/Loader";

const CryptoPrices=()=>{
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)
    const ENDPOINT=process.env.REACT_APP_SOCKET_URL

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("crypto-prices", data => {
            setResponse(data)
            setLoading(true)
            console.log(data)
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
    }, []);

    if(loading===false) return <Loader/>;
    return(
        <div className="col-md-12">
            <div className="row d-flex h-100 align-items-center">
                <div className="col-md-3">
                    <div className="card rounded-3 bg-primary text-light mt-2">
                        <div className="card-body">
                            <h4 className="card-title">{response ? response.btc.symbol : ''}</h4>
                            <p className="card-text">Price: {response ? response.btc.ask : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card rounded-3 bg-dark text-light mt-2">
                        <div className="card-body">
                            <h4 className="card-title">{response ? response.ada.symbol : ''}</h4>
                            <p className="card-text">Price: {response ? response.ada.ask : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card rounded-3 bg-danger text-light mt-2">
                        <div className="card-body">
                            <h4 className="card-title">{response ? response.eth.symbol : ''}</h4>
                            <p className="card-text">Price: {response ? response.eth.ask : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card rounded-3 bg-warning text-light mt-2">
                        <div className="card-body">
                            <h4 className="card-title">{response ? response.wax.symbol : ''}</h4>
                            <p className="card-text">Price: {response ? response.wax.ask : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CryptoPrices

