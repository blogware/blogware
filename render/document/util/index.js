var renderFile = require('./render-file');
var prepareOptions = require('./prepare-options');
var preparePaginator = require('./prepare-paginator');
var getSlug = require('./get-slug');
var l2p = require('./l2p');

module.exports = {
  renderFile: renderFile,
  prepareOptions: prepareOptions,
  preparePaginator: preparePaginator,
  getSlug: getSlug,
  l2p: l2p
};
