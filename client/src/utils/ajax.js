import request from 'superagent';
import Promise from 'bluebird';
Promise.config({
  cancellation: true,
});

const _parseParams = (
    method,
    url,
    queryOrData, {
      headers,
      type
    } = {}
  ) => {
    const params = {
      url,
      method,
      headers,
      type,
    };

    if (method === 'get') {
      params.query = queryOrData;
    } else {
      params.data = queryOrData;
    }

    return Object.assign(params, {
      url
    });
  },
  sendRequest = params => {
    const {
      method,
      query,
      data
    } = params,
    req = request[method](params.url);
    let _reject;

    if (query) {
      req.query(query);
    }

    if (data) {
      req.send(data);
    }

    const promise = new Promise((resolve, reject, onCancel) => {
      _reject = reject;

      req.end((err, res) => {
        if (!err) {
          resolve(res.body);
        } else {
          reject(err.response.body);
        }
      });

      if (onCancel) {
        onCancel(() => {
          req.abort();
        });
      }
    });

    promise.abort = function() {
      req.abort();
      _reject({
        type: 'ABORT'
      });
    };

    return promise;
  };

export default {
  get(url, query) {
      return sendRequest(_parseParams('get', url, query));
    },

    post(url, data, params) {
      return sendRequest(_parseParams('post', url, data, params));
    },

    put(url, data) {
      return sendRequest(_parseParams('put', url, data));
    },

    remove(url) {
      return sendRequest({
        url,
        method: 'del',
      });
    },
};