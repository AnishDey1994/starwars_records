import React from 'react';
import Particles from 'react-particles-js';

const UXParticles = (props) => {
    return (
        <div>
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 100
                        },
                        "size": {
                            "value": 3
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }} />
        </div>
    );

}
export default UXParticles;