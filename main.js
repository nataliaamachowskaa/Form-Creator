"use strict";
var DocumentList = /** @class */ (function () {
    function DocumentList() {
        this.list = [];
        this.ls = new LocStorage();
        this.getDocumentList();
    }
    DocumentList.prototype.getDocumentList = function () {
        this.list = this.ls.getDocuments();
    };
    DocumentList.prototype.generateTableHead = function (table, data) {
        var thead = table.createTHead();
        var row = thead.insertRow();
        for (var key in data) {
            var th = document.createElement("th");
            var text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    };
    DocumentList.prototype.generateRow = function (table, data) {
        var row = table.insertRow();
        for (var key in data) {
            var cell = row.insertCell();
            var text = document.createTextNode(data[key]);
            cell.appendChild(text);
        }
    };
    DocumentList.prototype.render = function () {
        var table = document.createElement("table");
        var doc = this.ls.loadDocument(this.list[0]);
        if (doc) {
            this.generateTableHead(table, doc);
            for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
                var id = _a[_i];
                doc = this.ls.loadDocument(id);
                this.generateRow(table, doc);
            }
        }
        return table;
    };
    return DocumentList;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FieldType;
(function (FieldType) {
    FieldType["Text"] = "text";
    FieldType["Textarea"] = "textarea";
    FieldType["Date"] = "date";
    FieldType["Email"] = "email";
    FieldType["Select"] = "select";
    FieldType["Checkbox"] = "checkbox";
})(FieldType || (FieldType = {}));
var FieldLabel = /** @class */ (function () {
    function FieldLabel(name, text) {
        this.label = document.createElement("label");
        this.label.textContent = text;
        this.label.htmlFor = name;
    }
    FieldLabel.prototype.render = function () {
        return this.label;
    };
    return FieldLabel;
}());
var InputField = /** @class */ (function () {
    function InputField(name, label) {
        if (label === void 0) { label = ""; }
        this.type = FieldType.Text;
        this.name = name;
        this.label = label;
    }
    InputField.prototype.getValue = function () {
        return this.elem.value.toString();
    };
    InputField.prototype.render = function () {
        var span = document.createElement("span");
        if (this.type == FieldType.Textarea) {
            this.elem = document.createElement("textarea");
        }
        else {
            this.elem = document.createElement("input");
            this.elem.type = this.type;
        }
        this.elem.name = this.name;
        span.appendChild((new FieldLabel(this.name, this.label).render()));
        span.appendChild(this.elem);
        return span;
    };
    return InputField;
}());
var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = FieldType.Date;
        return _this;
    }
    return DateField;
}(InputField));
var EmailField = /** @class */ (function (_super) {
    __extends(EmailField, _super);
    function EmailField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = FieldType.Email;
        return _this;
    }
    return EmailField;
}(InputField));
var CheckboxField = /** @class */ (function (_super) {
    __extends(CheckboxField, _super);
    function CheckboxField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = FieldType.Checkbox;
        return _this;
    }
    CheckboxField.prototype.getValue = function () {
        return this.elem.checked ? "Tak" : "Nie";
    };
    return CheckboxField;
}(InputField));
var TextAreaField = /** @class */ (function (_super) {
    __extends(TextAreaField, _super);
    function TextAreaField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = FieldType.Textarea;
        return _this;
    }
    return TextAreaField;
}(InputField));
var SelectField = /** @class */ (function (_super) {
    __extends(SelectField, _super);
    function SelectField(name, options, label) {
        if (label === void 0) { label = ""; }
        var _this = _super.call(this, name, label) || this;
        _this.type = FieldType.Select;
        _this.elem = document.createElement("select");
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            _this.addOption(option);
        }
        return _this;
    }
    SelectField.prototype.addOption = function (text) {
        var o = document.createElement('option');
        o.text = text;
        this.elem.add(o);
    };
    SelectField.prototype.render = function () {
        var span = document.createElement("span");
        this.elem.name = this.name;
        span.appendChild((new FieldLabel(this.name, this.label).render()));
        span.appendChild(this.elem);
        return span;
    };
    return SelectField;
}(InputField));
var Form = /** @class */ (function () {
    function Form(name) {
        this.fields = [];
        this.form = document.createElement("form");
        this.form.name = name;
        this.fields.push(new InputField("imie", "Imię"));
        this.fields.push(new InputField("nazwisko", "Nazwisko"));
        this.fields.push(new EmailField("email", "E-mail"));
        this.fields.push(new SelectField("kierunek", ["Informatyka", "Ekonometria", "Kosmetologia"], "Wybrany kierunek studiów"));
        this.fields.push(new DateField("data", "Data"));
        this.fields.push(new CheckboxField("elearning", "Czy preferujesz e-learning?"));
        this.fields.push(new TextAreaField("uwagi", "Uwagi"));
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            this.form.appendChild(field.render());
        }
    }
    Form.prototype.getValue = function () {
        var output = {};
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            output[field.name] = field.getValue();
        }
        return output;
    };
    Form.prototype.render = function () {
        var button = document.createElement('input');
        button.type = 'button';
        button.value = 'Zapisz';
        button.onclick = function (form) { return function () { form.save(); }; }(this);
        var button2 = document.createElement('input');
        button2.type = 'button';
        button2.value = 'Wstecz';
        button2.onclick = function () { window.location.href = "index.html"; };
        this.form.appendChild(button);
        this.form.appendChild(button2);
        return this.form;
    };
    Form.prototype.save = function () {
        (new LocStorage()).saveDocument(this.getValue());
        window.location.href = "index.html";
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App(id) {
        this.formularz = new Form("formularz");
        var div = document.getElementById(id);
        if (div)
            div.appendChild(this.formularz.render());
    }
    return App;
}());
var LocStorage = /** @class */ (function () {
    function LocStorage() {
    }
    LocStorage.prototype.saveDocument = function (doc) {
        var id = Date.now().toString();
        localStorage.setItem(id, JSON.stringify(doc));
        var ids = this.getDocuments();
        ids.push(id);
        localStorage.setItem("ids", JSON.stringify(ids));
        return id;
    };
    LocStorage.prototype.loadDocument = function (id) {
        return JSON.parse(localStorage.getItem(id) || "{}");
    };
    LocStorage.prototype.getDocuments = function () {
        return JSON.parse(localStorage.getItem("ids") || "[]");
    };
    return LocStorage;
}());
