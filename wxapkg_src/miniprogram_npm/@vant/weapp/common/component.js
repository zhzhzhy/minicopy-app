Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VantComponent = void 0;

var e = require("../mixins/basic");

exports.VantComponent = function(s) {
    var a, t, o, r = {};
    a = s, t = r, o = {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        destroyed: "detached",
        classes: "externalClasses"
    }, Object.keys(o).forEach(function(e) {
        a[e] && (t[o[e]] = a[e]);
    }), r.externalClasses = r.externalClasses || [], r.externalClasses.push("custom-class"), 
    r.behaviors = r.behaviors || [], r.behaviors.push(e.basic);
    var i = s.relation;
    i && (r.relations = i.relations, r.behaviors.push(i.mixin)), s.field && r.behaviors.push("wx://form-field"), 
    r.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, Component(r);
};