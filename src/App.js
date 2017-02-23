import hackNews from './HackNews';
import * as _ from 'lodash';

import React, { Component } from 'react';
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
    )
  }
}

class PageContent extends Component {
    constructor() {
        super();
        this.state = {
            titles: {
                stories: 'Top 30 Stories',
                comments: 'Top 10 Commenters'
            },
            items: []
        };
    }

    componentDidMount() {
        hackNews()
            .then(
                (response) => this.setState({items: response})
            );
    }

    _filterStories() {
        return _.filter(this.state.items, (item) => item.type === 'story')
    }

    _filterComments() {
        return _.filter(this.state.items, (item) => item.type === 'comment')
    }

    render() {
        let storyTitles = _storyTitles(this._filterStories());
        let topCommenters = _topCommenters(this._filterComments());
        return (
            <div className="page-content">
                <Card title={this.state.titles.stories} items={storyTitles}/>
                <Card title={this.state.titles.comments} items={topCommenters}/>
            </div>
        )
    }
}

class Card extends Component {

    _renderItems(arr) {
        return _.map(arr, listItem)
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{this.props.title}</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    <ul className='mdl-list'>
                        {this._renderItems(this.props.items)}
                    </ul>
                </div>
            </div>
        );
    }
}

//==============================================================================
// Helper funtions

const listItem = (item) =>
    <li className="mdl-list__item">{JSON.stringify(item)}</li>;

let _storyTitles = (arr) =>  {
    return _.map(arr, (story) => story.title)
};

let tupleToObject = (tuple) =>  {
    let obj ={};
    obj[tuple[0]] = tuple[1];
    return obj;
};

let _topCommenters = (comments) => {
    let entries = _.entries(_.countBy(comments, 'by'));
    let sorted = _.reverse(_.sortBy(entries, (comment) => comment[1]));
    let obj = _.map(sorted,(comment) => tupleToObject(comment));
    return _.slice(obj, 0, 10)
};
