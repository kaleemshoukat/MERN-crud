import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import Loader from "../components/Loader";
//gallery
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
//silk slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//localization
import { useTranslation } from 'react-i18next';

const CryptoPrices=()=>{
    const { t } = useTranslation();
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

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };

    if(loading===false) return <Loader/>;
    return(
        <div className="col-md-12">
            <div className="row d-flex h-100 align-items-center">
                <div className="col-md-12">
                    <h4 className="text-danger">{t('crypto')}</h4>
                </div>
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
            <div className="col-md-12 mt-5">
                <h4 className="text-danger">{t('gallery')}</h4>
            </div>
            <div className="mt-2">
                <ImageGallery items={images} />
            </div>
            <div className="col-md-12 mt-5">
                <h4 className="text-danger">{t('slick')}</h4>
            </div>
            <div className="mt-2 text-center">
                <Slider {...settings}>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                    <div className="m-2">
                        <img src="https://picsum.photos/id/1019/1000/600/" alt="img"/>
                        <h3>Test Name</h3>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default CryptoPrices

