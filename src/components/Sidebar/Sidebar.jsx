import React, { Component, useState } from 'react';
import './Sidebar.css'
import {
    FaHome,
    FaSignOutAlt,
} from 'react-icons/fa'
import { MdLeaderboard } from 'react-icons/md'
import { TbDeviceAnalytics } from 'react-icons/tb'

import { Navigate } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            rotate: false,
            navigateTo: <></>
        }
        this.menuItems = [
            {
                path: "/home",
                name: "Home",
                icon: <FaHome className='sidebar-item-icon' color='#0048a7' />
            },
            {
                path: "/createschedule",
                name: "Relatórios",
                icon: <TbDeviceAnalytics className='sidebar-item-icon' color='#0048a7' />
            },
            {
                path: "/myschedules",
                name: "Principais gastos",
                icon: <MdLeaderboard className='sidebar-item-icon' color='#0048a7' />
            },
            {
                path: "/",
                name: "Sair",
                icon: <FaSignOutAlt className='sidebar-item-icon' color='#0048a7' />
            }
        ];


    }

    resetPath() {
        this.setState({
            navigateTo: <></>
        })
    }

    handleScreenNavigation(screen) {
        if (screen == '/') localStorage.removeItem('token');
        this.setState({
            navigateTo: <Navigate to={screen} replace={true} />
        }, () => {
            this.resetPath();
        })
    }

    handleCollpseClick(state) {
        if (state == 'close') {
            this.setState({
                isOpened: false,
                rotate: !this.state.rotate
            })
        } else {
            this.setState({
                isOpened: true,
                rotate: !this.state.rotate
            })

        }
    }

    render() {
        return (
            <div>
                {this.state.navigateTo}
                <div
                    onMouseOver={() => {
                        this.handleCollpseClick('open');
                    }}
                    onMouseLeave={() => {
                        this.handleCollpseClick('close');
                    }}
                    className={this.state.isOpened ?
                        'sidebar-wrapper' :
                        'sidebar-wrapper sidebar-wrapper-collapsed'}>
                    <header className='header-wrapper'>
                        <img src='./logo.png' alt='logo-img' className='logo-check-sign'/>
                    </header>
                    <main>
                        {this.menuItems.map((item, index) => {
                            return (
                                <div className='sidebar-item-wrapper' onClick={() => { this.handleScreenNavigation(item.path) }}>
                                    <div className='sidebar-item-icon'>
                                        {item.icon}
                                    </div>
                                    <div className={this.state.isOpened ? 'sidebar-item-text' : 'sidebar-item-text sidebar-item-text-collapsed'}>
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })}
                    </main>
                </div>
            </div>
        )
    }

}


export default Sidebar;