import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Hacker News</span>
                </div>
            </header>
            <main className="mdl-layout__content">
                <PageContent />
            </main>
        </div>
    );
  }
}

class PageContent extends Component {
    render() {
        return (
            <div className="page-content">
                <Stories />
                <Commenters />
            </div>
        );
    }
}

class Stories extends Component {
    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Top Stories</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    <ul className='mdl-list'>
                        <li className="mdl-list__item">Title 1</li>
                        <li className="mdl-list__item">Title 2</li>
                        <li className="mdl-list__item">Title 3</li>
                    </ul>
                </div>
            </div>
        );
    }
}


class Commenters extends Component {
    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Top Commenters</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    <ul className='mdl-list'>
                        <li className="mdl-list__item">Commenter 1: 12</li>
                        <li className="mdl-list__item">Commenter 2: 7</li>
                        <li className="mdl-list__item">Commenter 3: 5</li>
                    </ul>
                </div>
            </div>
        );
    }
}

