import React from 'react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';

const NonAuthLayout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </React.Fragment>
  )
}

export default NonAuthLayout