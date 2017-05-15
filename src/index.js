import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import NotFound from './components/not_found';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
		<div>
      <Switch>
        	<Route path="/posts/new" component={PostsNew} />
        	<Route path="/posts/:id" component={PostsShow} />
			<Route path="/" component={PostsIndex} />
			<Route path="*" component={NotFound} />
      </Switch>
		</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
