Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.useChildren = exports.useParent = void 0, exports.useParent = function(e, n) {
    var t, i = "../".concat(e, "/index");
    return {
        relations: (t = {}, t[i] = {
            type: "ancestor",
            linked: function() {
                n && n.call(this);
            },
            linkChanged: function() {
                n && n.call(this);
            },
            unlinked: function() {
                n && n.call(this);
            }
        }, t),
        mixin: Behavior({
            created: function() {
                var e = this;
                Object.defineProperty(this, "parent", {
                    get: function() {
                        return e.getRelationNodes(i)[0];
                    }
                }), Object.defineProperty(this, "index", {
                    get: function() {
                        var n, t;
                        return null === (t = null === (n = e.parent) || void 0 === n ? void 0 : n.children) || void 0 === t ? void 0 : t.indexOf(e);
                    }
                });
            }
        })
    };
}, exports.useChildren = function(e, n) {
    var t, i = "../".concat(e, "/index");
    return {
        relations: (t = {}, t[i] = {
            type: "descendant",
            linked: function(e) {
                n && n.call(this, e);
            },
            linkChanged: function(e) {
                n && n.call(this, e);
            },
            unlinked: function(e) {
                n && n.call(this, e);
            }
        }, t),
        mixin: Behavior({
            created: function() {
                var e = this;
                Object.defineProperty(this, "children", {
                    get: function() {
                        return e.getRelationNodes(i) || [];
                    }
                });
            }
        })
    };
};