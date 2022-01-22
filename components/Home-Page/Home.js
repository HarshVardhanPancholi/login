import React from 'react';
import styles from '../Home-Page/home.module.css';
import {Link} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
function Home() {

   return (
      <React.Fragment>
        <Header/>
            <div className={styles.cont}>
            <div className={styles.coch1}>
                
                <h1>Discover</h1>
                <p>Welcome to the Discover training portal. To know more...</p>
                <div className="d-grid gap-2 col-3 ms-1">
                  <Link to="/login" className="btn btn-primary btn-md ">Sign In &gt;&gt;&gt;</Link>
                  <Link to="/registration" className="btn btn-primary btn-md">Sign Up &gt;&gt;&gt;</Link>
                </div>
            </div>
        </div>
        <Footer/>
      </React.Fragment>
    );
}

export default Home;
