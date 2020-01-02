import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import User from './User';

const nprogressStart = url => {
  NProgress.start();
};

const nprogressDone = url => {
  NProgress.done();
};

Router.events.on('routeChangeStart', nprogressStart);
Router.events.on('routeChangeComplete', nprogressDone);

const Header = props => {
  const Navbar = styled.div`
    width: 100%;
    padding: 20px;
    color: white;
    background: black;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    .logo {
      /* flex: 1; */
      margin-right: 1rem;
      margin-left: 10rem;
      text-transform: uppercase;
      font-size: 3rem;
      transform: skew(-7deg);
      border-left: 3px solid white;
      border-right: 3px solid white;
      padding: 0px 20px 0px 20px;
      a {
        color: white;
        text-decoration: none;
      }
    }
    .nav-items {
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      padding-left: 50px;
      text-transform: uppercase;
      font-size: 2.5rem;
      font-family: 'Lato';
      font-weight: 300;
      letter-spacing: 2px;
      a {
        margin-left: 10px;
        color: white;
        text-decoration: none;
        padding-left: 10px;
        padding-right: 10px;
        position: relative;
      }
      a:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #fff;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
      }
      a:hover:before {
        visibility: visible;
        transform: scaleX(1);
      }
    }
    .search-cart {
      display: flex;
      align-items: flex-end;
      display: flex;
      flex-direction: row;
      margin-right: 3rem;
      input {
        padding-left: 10px;
        font-size: 2rem;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
    .sign-up {
      cursor: pointer;
      p {
        border: 1px solid white;
      }
    }
  `;

  return (
    <Navbar>
      <div className="logo">
        <Link href="/index">
          <a>logo</a>
        </Link>
      </div>
      <div className="nav-items">
        <Link href="/arts">
          <a>ARTs</a>
        </Link>
        <Link href="/add">
          <a>add_art</a>
        </Link>
        <Link href="/test2">
          <a>user</a>
        </Link>
        <Link href="/test2">
          <a>buy_art</a>
        </Link>
        <Link href="/test2">
          <a>misc</a>
        </Link>
      </div>
      <div className="search-cart">
        <div className="search-box">
          <input type="text" placeholder="search" />
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
