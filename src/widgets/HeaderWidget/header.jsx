import React from 'react';
import logo from '../../assets/images/logo.png';
import char1 from '../../assets/images/char1.png';
import char2 from '../../assets/images/char2.png';
import './header.scss';
const Header = () => {
    return (
        <div className='headerSection'>
            <div className='headerItem'>
                <img src={char1} alt='char1' id='char1'></img>
            </div>
            <div className='headerItem'>
                <img src={logo} alt='char1' id='logo'></img>
            </div>
            <div className='headerItem'>
                <img src={char2} alt='char1' id='char2'></img>
            </div>
        </div>
    );
};

export default Header;