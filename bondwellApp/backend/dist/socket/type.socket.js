"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientType = exports.MessageTarget = void 0;
var MessageTarget;
(function (MessageTarget) {
    MessageTarget["BROADCAST"] = "broadcast";
    MessageTarget["ROOM"] = "room";
    MessageTarget["INDIVIDUAL"] = "individual";
    MessageTarget["SELF"] = "self";
})(MessageTarget || (exports.MessageTarget = MessageTarget = {}));
var RecipientType;
(function (RecipientType) {
    RecipientType["USER"] = "user";
    RecipientType["AI"] = "ai";
})(RecipientType || (exports.RecipientType = RecipientType = {}));
