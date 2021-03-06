// Generated by CoffeeScript 1.10.0
(function() {
  var data, documents, fs, idx, lunr, make_id, visit_tree;

  lunr = require('lunr');

  data = require('../data/divina_commedia.json');

  fs = require('fs');

  documents = [];

  make_id = function(node) {
    return (node.parent.parent.parent.parent.children.indexOf(node.parent.parent.parent)) + " " + (node.parent.parent.parent.children.indexOf(node.parent.parent)) + " " + (node.parent.parent.children.indexOf(node.parent)) + " " + (node.parent.children.indexOf(node));
  };

  visit_tree = function(node, parent) {
    var child, i, len, ref, results;
    node.parent = parent;
    if (node.children != null) {
      ref = node.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        results.push(visit_tree(child, node));
      }
      return results;
    } else {
      return documents.push({
        "id": make_id(node),
        "text": node.text
      });
    }
  };

  visit_tree(data, null);

  idx = lunr(function() {
    this.ref('id');
    this.field('text');
    this.metadataWhitelist = ['position'];
    return documents.forEach((function(doc) {
      return this.add(doc);
    }), this);
  });

  fs.writeFile("./index", JSON.stringify(idx), function(err) {
    if (err) {
      console.log(err);
    }
    return console.log('Index correctly created!');
  });

}).call(this);
