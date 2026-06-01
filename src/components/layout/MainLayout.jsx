import Header from './Header';

import Footer from './Footer';

import {
  motion,
} from 'framer-motion';

import PropTypes from 'prop-types';

function MainLayout({
  children,
}) {

  return (

    <>

      <Header />

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.35,
        }}
      >

        {children}

      </motion.div>

      <Footer />

    </>
  );
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;