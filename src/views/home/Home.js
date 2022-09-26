import React, { useEffect, useRef } from 'react';
// @mui material components
import bgImage from "../../assets/images/bgImage_home.jpg";
import bgImage1 from "../../assets/images/bgImage_home1.jpg";
import logo from "../../assets/images/logoFM_home.png";
import logoGif from "../../assets/images/logoGif.gif";
import fullLogo from "../../assets/images/logoFMW.png";
import Carousel from "./Carousel";
import './Home.css';
import { AccountCircle, ArrowCircleUp, Article, Contacts, MedicalInformation, MedicalServices } from '@mui/icons-material';
import { useHistory } from 'react-router-dom'
import useNearScreen from '../../hooks/useNearScreen';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppFooter from '../../components/AppFooter';
import PlanCards from 'src/components/ProductCards/PlanCards';
import Request from 'src/utils/Request';

const content = [
  'lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit',
  'lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit',
  'lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit'
]

const carouselContent = [
  {
    label: 'Lago en algun lugar del mundo',
    imgPath:
      'https://fondosmil.com/fondo/2319.jpg',
  },
  {
    label: 'lago de dia hermoso',
    imgPath:
      'https://fondosmil.com/fondo/11112.jpg',
  },
  {
    label: 'lago congelado',
    imgPath:
      'https://www.solofondos.com/wp-content/uploads/2015/04/Fondos-de-paisajes-768x480.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://www.solofondos.com/wp-content/uploads/2015/04/paisajes-para-fondo-de-escritorio-gratis-768x432.jpg',
  },

]

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [packages, setPackages] = React.useState([]);
  const appBar = useRef(null);
  const mainContainer = useRef(null);
  const elementRef = useNearScreen({ distance: '0px', threshold: 0.2, root: null, externalRef: mainContainer });
  const history = useHistory()
  useEffect(() => {
    if (elementRef.isNearScreen) {
      appBar?.current?.classList?.remove("visible");
    } else {
      appBar?.current?.classList?.add("visible");
    }
  }, [elementRef.isNearScreen]);

  useEffect(() => {
    const getPackages = async() =>{
      const res = await Request.get('/packages')
        console.log(res.data)
        setPackages(res.data.content)
    }
    getPackages()
  }, [])
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const scrollTop = () => {
    if (window.scrollY != 0) {
      window.scrollTo(0, 0);

    }
  };

  return (
    <>
      <AppBar ref={appBar} className='appBar' position='relative' sx={{ top: '-4rem', visibility: 'hidden', zIndex: 0, opacity: '0' }}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <img
              style={{ width: '60px', padding: '5px' }}
              className="appBar-logo"
              src={logo}
              alt="logo fmunefm"
            />
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={scrollTop}
              color="inherit"

              sx={{ mr: 3 }}
            >
              <ArrowCircleUp />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Noticias</MenuItem>
              <MenuItem onClick={handleClose}>Servicios</MenuItem>
              <MenuItem onClick={handleClose}>Planes</MenuItem>
              <MenuItem onClick={handleClose}>Contacto</MenuItem>
              <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
      <div
        ref={mainContainer}
        id='main-container'
        className='main-container'
        style={{
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "top",
          placeItems: "center",
        }}
      >
        <div className="filter"></div>
        <div id='container_p' className='container_p'>
          <div className='container_logo' >
            <img
              className="animationLogo"
              src={logoGif}
              alt="puzzle logo fmunefm"
            />
            <img
              className="full_logo"
              src={fullLogo}
              alt="logo fmunefm"
            />
            <h5 className="title_logo">
              FONDO DE MUTUALIDAD
            </h5>
            <h5 className="slogan">
              Transformando el sistema de salud de los trabajadores universitarios...
            </h5>

          </div>
        </div>
        <div className='container_button'>
          <div id="scroll-container">
            <div id="scroll-text">10 de Junio de 2022 - tasa del dia $: 5,10 BsD - Planes: APS Plus (2$), APS Master (3$), APS Full (5$)</div>
          </div>
          <div className='button_group'>

            <button className='button'>
              <Article color='primary' />
              <span>Contacto</span>
            </button>
            <button className='button'>
              <MedicalServices color='primary' />
              <span>Servicios</span>
            </button>
            <button className='button' onClick={()=> window.location.href='#plans'}>
              <MedicalInformation color='primary' />
              <span>Planes</span>
            </button>
            <button className='button'>
              <Contacts color='primary' />
              <span>Registro</span>
            </button>
            <button onClick={() => history.push('/login')} className='button'>
              <AccountCircle color='primary' />
              <span>Ingresar</span>
            </button>

          </div>
        </div>
      </div>

      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}

      <div
        className="card_home"
      >
        <Carousel title='RESUMEN DE NOTICIAS' content={carouselContent} id='carousel' />
        {content.map((el, i) =>
          <p style={{ textAlign: 'justify', margin: '15px' }} key={i}>{el}</p>
        )}
      </div>
      <div id='plans' className='plans'>
        <PlanCards dataSource={packages} cardsToShow={3}/>
      </div>
      <AppFooter />
    </>
  );
}

