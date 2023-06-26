import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../state/authSlice'

const Header = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try{
          dispatch(logout());
          navigate('/');
        } catch(err) {
          console.log(err)
        }
      }

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const gitHubClickHandler = () => {
        menuToggleHandler();
        window.open("https://github.com/GPVcode/aiAssistant", "_blank")
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    ChatGPT Assistant
                </Link>

                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    {/* <ul>
                    { userInfo ? 
                        (<Link onClick={ logoutHandler }>Logout</Link>) :
                        <Link to='/'>Login</Link>}
                        <li>
                            <button onClick={gitHubClickHandler}>GitHub</button>
                        </li>
                        <li>
                            <Link to="/page-two" onClick={menuToggleHandler}>
                                PageTwo
                            </Link>
                        </li>
                        <li>
                            <Link to="/page-three" onClick={menuToggleHandler}>
                                PageThree
                            </Link>
                        </li>
                    </ul> */}

                    <button onClick={gitHubClickHandler}>GitHub</button>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;