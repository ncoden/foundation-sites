'use strict';

!function($) {

Foundation.ElemStore = function(elem) {
  return {
    store: getStore(elem),
    find: findStore.bind(elem),
    create: createStore.bind(elem),
    destroy: deleteStore.bind(elem)
  };
};

var globalStore = [];

function getStore(elem) {
  var store = findStore(elem);

  if (typeof store === 'undefined')
    store = createStore(elem);
  return store;
}

function findStore(elem) {
  var storeId = getStoreId(elem);

  if (typeof storeId !== 'undefined')
    return globalStore[storeId];
}

function createStore(elem) {
  var store = {};

  globalStore.push({
    elem: elem,
    store: store
  });
  return store;
}

function deleteStore(elem) {
  var storeId = getStoreId(elem);

  if (typeof storeId !== 'undefined')
    globalStore.splice(storeId, 1);
}

function getStoreId(elem) {
  for (i in globalStore) {
    if (globalStore[i].elem === elem) {
      return i;
    }
  }
}

}(jQuery);
