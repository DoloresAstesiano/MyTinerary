import React from "react";
import "../styles/hero.css"
import Button from '@mui/material/Button';
import { Link as LinkRouter } from "react-router-dom";

export default function Hero() {
    return (
        <>
            <div className="container_hero">
                <div className="container_container">
                    <div>
                        <h1 className="title_hero">My Tinerary</h1>
                        <div className="container_slogan">
                            <p className="slogan"><b>"Find your perfect trip,
                                designed by insiders who know and love
                                their cities!"</b></p>
                        </div>
                    </div>

                    <div className="conatainer_button_hero">
                        <p className="txt_button_hero"><b>Let´s Start!</b></p>
                        <LinkRouter to="/Cities">
                            <Button className="button_hero" variant="contained" disableElevation>
                                CLICK HERE
                            </Button>
                        </LinkRouter>
                    </div>
                </div>
            </div>
        </>
    )
}
