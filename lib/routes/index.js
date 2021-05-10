"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var calculate_1 = require("./calculate");
var router = express_1.Router();
function myDatabase() {
    try {
        return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '/database/data.json'), 'utf8'));
    }
    catch (_a) {
        return [];
    }
}
function writeToDatabase(input) {
    return fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", "/database/data.json"), JSON.stringify(input, null, 2));
}
var holder = myDatabase();
// redirect to homepage
router.get("/", function (req, res) {
    res.redirect("/fetchRecords");
});
/* GET home page. */
router.get("/fetchRecords", function (req, res) {
    res.json(holder);
});
/* post dimensions to database. */
router.post("/calculate", function (req, res) {
    var input = req.body;
    var valid = calculate_1.validator(input);
    if (!valid) {
        var area = calculate_1.calculator(input);
        if (typeof area.message !== "number") {
            res.status(400).json(area.message);
        }
        var id = 0;
        if (holder.length == 0) {
            id = 1;
        }
        else {
            id = holder[holder.length - 1].id + 1;
        }
        var createdAt = new Date(Date.now()).toISOString();
        var writeInput = __assign({ id: id, createdAt: createdAt, area: area.message }, input);
        if (holder.length == 0) {
            writeToDatabase([writeInput]);
        }
        else {
            holder.push(writeInput);
            writeToDatabase(holder);
        }
        res.status(201).json(writeInput);
    }
    else {
        var status_1 = 400;
        if (valid.message == "guy gimmme valid shape na") {
            status_1 = 404;
        }
        res.status(status_1).json(valid.message);
    }
});
exports.default = router;
