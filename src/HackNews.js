const https = require('https');
const _ = require('lodash');

let buildUrl = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const getContent = (url) => {
  return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
          let body = '';
          response.on('data', (chunk) => body += chunk);
          response.on('end', () => resolve(JSON.parse(body)));
      });
      request.on('error', (err) => reject(err));
  })
};

let getItemById = (id) => getContent(buildUrl(id));

let getStory = (id) => getItemById(id).then((story) =>
    Promise.all([story, getComments(story)]));

let getStories = (ids) => _.map(_.slice(ids, 0, 31), (id) => getStory(id));

let getComments = (item) => {
    if(item.kids == null){
        return Promise.resolve([]);
    } else {
        let kid = item.kids[0];
        return getItemById(kid).then((item) =>
            Promise.all([item, getComments(item)]))
    }
};

let hackNews = () =>
    getContent('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((ids) => Promise.all(getStories(ids)))
        .then(_.flattenDeep)
        .then((items) => _.filter(items, (item) => item.deleted == null))
        .catch((err) => console.error(err));

module.exports = hackNews;