import './Banner.css';
import { useState,useEffect } from 'react';

function Banner() {
   const [bannerContent,setBannerContent]=useState();
   
   useEffect(()=>{
    setInterval(()=>{
        if(localStorage.getItem('role')=="admin" || localStorage.getItem('role')=="user")
        {
            setBannerContent(
                <></>
            );
        }    
        else
        {
            setBannerContent(
                <>
                
       {/* Carousel Start */}
       <div className="container-fluid p-0">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="./assets/img/carousel-1.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" >
                        <div className="p-3" style={{"maxWidth": "900px"}}>
                            <h5 className="text-white text-uppercase mb-3 animated slideInDown">Welcome To Take Our Services</h5>
                            <h1 className="display-3 text-white animated slideInDown mb-4">Best Carpenter & Craftsman Services</h1> 
                            <p className="fs-5 fw-medium text-white mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.</p>
                            <a className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Read More</a>
                            <a className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Free Quote</a>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="./assets/img/carousel-2.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{"maxWidth": "900px"}}>
                            <h5 className="text-white text-uppercase mb-3 animated slideInDown">Welcome To TOS</h5>
                            <h1 className="display-3 text-white animated slideInDown mb-4">Best Plumbing Services</h1>        
                            <p className="fs-5 fw-medium text-white mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.</p>
                            <a className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Read More</a>
                            <a className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Free Quote</a>
                        </div>
                    </div>
                </div>   
              <div className="carousel-item">
                    <img className="w-100" src="./assets/img/carousel-2.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{"maxWidth": "900px"}}>
                            <h5 className="text-white text-uppercase mb-3 animated slideInDown">Welcome To TOS</h5>
                            <h1 className="display-3 text-white animated slideInDown mb-4">Best Elctrician Services</h1>        
                            <p className="fs-5 fw-medium text-white mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.</p>
                            <a className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Read More</a>
                            <a className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Free Quote</a>
                        </div>
                    </div>
                </div>   
        </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    {/* Carousel End */} 

                </>
            )
        }


    },1)

   },[])
   return (
  <> 
    {
        bannerContent
    }
  </>  
  );
}

export default Banner;
