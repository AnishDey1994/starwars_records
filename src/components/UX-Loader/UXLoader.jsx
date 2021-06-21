import React from 'react';
import PropTypes from 'prop-types';
import starWarLoader from '../../assets/images/rocketLogo.gif';
import './UXLoader.scss';
const UXLoader = props => {
    return (
        <div className={props.fullPageOverlay ? 'fullPageOverlay' : null}>
            <div className={props.loaderType === 'img' ? 'imgLoaderWrapper' : 'loaderWrapper'}>
                {
                    props.loaderType && props.loaderType === 'img' ?
                        <img src={starWarLoader} className='imgLoader' alt='loading..'></img>
                        : <div className='loader'></div>
                }
            </div>
        </div>
    );
};

UXLoader.propTypes = {
    fullPageOverlay: PropTypes.bool,
    loaderType: PropTypes.string
};

export default UXLoader;