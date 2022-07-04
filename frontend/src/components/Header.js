import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shared/navbar/logo.png";
import lang from "../assets/shared/navbar/localization.png";
import "./Header.css"
import "./font.css"
const Header =()=>{

const afterClick =()=>{
  let link=document.querySelector('[data-toggle-menu]');

  let link1=document.querySelector('[data-show-hidden]');
 
  if(link.classList.contains('toggle-menu--clicked')){
    link.classList.remove('toggle-menu--clicked')
    link1.classList.add('show-hidden-clicked')
    // link1.classList.remove('show-hidden-clicked')
  }
  else if (link1.classList.contains('show-hidden-clicked')){
    link1.classList.remove('show-hidden-clicked')

  }
  else {
    link.classList.add('toggle-menu--clicked')
  
  }
  
}
const hideMenu =()=>{
  let link=document.querySelector('[data-toggle-menu]');
  let link1=document.querySelector('[data-show-hidden]');
  if(link.classList.contains('toggle-menu--clicked')){
    link.classList.remove('toggle-menu--clicked')
  }
    link1.classList.add('show-hidden-clicked')
 
  

 
  
  
}




    return(
        <>
    <section className="home-page"> 
      <div className="navbar-section pb-2">
        <div className="container">
           <nav className="navbar navbar-expand-lg px-0 py-3"><Link className="navbar-brand m-0" to="/home"><img src={logo}/></Link>
            <button className="navbar-toggler" onClick={afterClick} type="button"  data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <div className="toggle-menu" data-toggle-menu=""><span className="menu__bar"></span><span className="menu__bar"></span><span className="menu__bar"></span></div>
            </button>
            <div className="collapse navbar-collapse show-hidden" data-show-hidden="" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto">
                <li className="nav-item"><Link className="nav-link" onClick={hideMenu}  to="/portofolio">PORTOFOLIO </Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={hideMenu} to="/service">SERVICES</Link></li>
                <li className="nav-item"><Link className="nav-link"  onClick={hideMenu} to="/store">STORE </Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={hideMenu} to="/blog">BLOG</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={hideMenu} to="about-us">ABOUT US</Link></li>
                {/* <li className="nav-item"><Link className="nav-link" to="contact-us">CONTACT US</Link></li> */}
                <li className="nav-item"><Link className="nav-link" onClick={hideMenu} to="contact-us">CONTACT US</Link></li>
              </ul>
              <div className="form-inline my-2 my-lg-0">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown"><Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={lang} width="15px" alt="" srcset=""/><span className="mx-2">EN</span></Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"><Link className="dropdown-item" to="#">Deutsch</Link>
                      <div className="dropdown-divider"></div><Link className="dropdown-item" to="#">English</Link>
                      <div className="dropdown-divider"></div><Link className="dropdown-item" to="#">العربية</Link>
                    </div>
                  </li>
                   <li className="nav-item"><div className="nav-link" data-toggle="modal" data-target="#loginModal">LOG IN</div></li>
                  <li className="nav-item"><div className="nav-link"  data-toggle="modal" data-target="#signupModal">SIGN UP</div></li>
                  <li className="nav-item"><div className="nav-link"  data-toggle="modal" data-target="#subscribeModal">SUBSCRIBE</div></li> 
        
                
                
                
                </ul>
              </div>
            </div>
          </nav>
          
        </div>
        </div>
        </section>
        {/* <Route exact path="/subscribe"  component={Subscribe} />
       <Route exact path="/signup"  component={Signup} />
       <Route exact path="/login"  component={Login} /> */}

        </>
    )
}
export default Header