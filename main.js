"use strict";
var FormCreator = /** @class */ (function () {
    function FormCreator() {
        this.fields = [];
        this.form = document.createElement("form");
        this.formularz = new Form("formularz");
        this.div = document.createElement("div");
        this.content = document.createElement("div");
        this.fields.push(new SelectField("type", ["Pole tekstowe", "Pole wielolinijkowe", "Data", "E-mail", "Checkbox"], "Typ pola", ""));
        this.fields.push(new InputField("name", "Nazwa", ""));
        this.fields.push(new InputField("label", "Etykieta", ""));
        this.fields.push(new InputField("value", "Domyślna wartość", ""));
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            this.form.appendChild(field.render());
        }
        this.button = document.createElement('input');
        this.button.type = 'button';
        this.button.value = 'Dodaj pole';
        this.button.onclick = function (that) {
            return function () {
                switch (that.fields[0].getValue()) {
                    case "Pole tekstowe":
                        that.formularz.addField(new InputField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue()));
                        break;
                    case "Pole wielolinijkowe":
                        that.formularz.addField(new TextAreaField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue()));
                        break;
                    case "Data":
                        that.formularz.addField(new DateField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue()));
                        break;
                    case "E-mail":
                        that.formularz.addField(new EmailField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue()));
                        break;
                    case "Checkbox":
                        that.formularz.addField(new CheckboxField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue()));
                        break;
                }
                that.div.innerHTML = "";
                that.div.appendChild(that.formularz.render());
            };
        }(this);
        this.form.appendChild(this.button);
        var button1 = document.createElement('input');
        button1.type = 'button';
        button1.value = 'Zapisz';
        button1.onclick = function (that) { return function () { that.saveForm(); }; }(this);
        this.form.appendChild(button1);
        this.content.appendChild(this.div);
        this.content.appendChild(document.createElement('hr'));
        this.content.appendChild(this.form);
    }
    FormCreator.prototype.newForm = function () {
        // let id = Router.getParam('id');
        // if(id) {
        //   this.formularz = (new LocStorage).loadForm(id);
        //   this.div.innerHTML = "";
        //   this.div.appendChild(this.formularz.render());
        //}
        this.formularz = new Form();
        return this.content;
    };
    FormCreator.prototype.saveForm = function () {
        (new LocStorage).saveForm(this.formularz);
        window.location.href = "index.html";
    };
    FormCreator.prototype.formList = function () {
        var table = document.createElement("table");
        var list = new DocumentList().getDocumentList();
        //console.log(list);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var id = list_1[_i];
            if (id.substr(0, 4) != 'form')
                continue;
            var tr = table.insertRow();
            var a = document.createElement('a');
            a.appendChild(document.createTextNode(id));
            a.href = 'new-document.html?id=' + id;
            tr.insertCell().appendChild(a);
            var button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'Usuń';
            button.onclick = function (id) {
                return function () {
                    new DocumentList().removeDocument(id);
                    window.location.reload();
                };
            }(id);
            tr.insertCell().appendChild(button);
        }
        return table;
    };
    return FormCreator;
}());
var DocumentList = /** @class */ (function () {
    function DocumentList() {
        this.list = [];
        this.ls = new LocStorage();
        this.getDocumentList();
    }
    DocumentList.prototype.getDocumentList = function () {
        this.list = this.ls.getDocuments();
        return this.list;
    };
    DocumentList.prototype.getDocument = function (id) {
        return this.ls.loadDocument(id);
    };
    DocumentList.prototype.removeDocument = function (id) {
        this.ls.removeDocument(id);
    };
    DocumentList.prototype.render = function () {
        var table = document.createElement("table");
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var id = _a[_i];
            if (id.substr(0, 4) == 'form')
                continue;
            var tr = table.insertRow();
            var a = document.createElement('a');
            a.appendChild(document.createTextNode(id));
            a.href = 'edit-document.html?id=' + id;
            tr.insertCell().appendChild(a);
            var button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'Usuń';
            button.onclick = function (that, id) { return function () { that.removeDocument(id); window.location.reload(); }; }(this, id);
            tr.insertCell().appendChild(button);
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
    function FieldLabel(field) {
        this.label = document.createElement("label");
        this.label.textContent = field.label;
        this.label.htmlFor = field.name;
    }
    FieldLabel.prototype.render = function () {
        return this.label;
    };
    return FieldLabel;
}());
var InputField = /** @class */ (function () {
    function InputField(name, label, value) {
        this.type = FieldType.Text;
        this.name = name;
        this.label = label;
        this.value = value;
    }
    InputField.prototype.getValue = function () {
        return (this.type == FieldType.Checkbox) ? this.elem.checked : this.elem.value;
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
        if (this.type == FieldType.Checkbox) {
            this.elem.checked = this.value;
        }
        else {
            this.elem.value = this.value;
        }
        span.appendChild((new FieldLabel(this).render()));
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
        return this.elem.checked;
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
    function SelectField(name, options, label, value) {
        var _this = _super.call(this, name, label, value) || this;
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
        if (this.value) {
            for (var i = 0; i < this.elem.options.length; i++) {
                if (this.elem.options[i].text == this.value) {
                    this.elem.options.selectedIndex = i;
                    break;
                }
            }
        }
        var span = document.createElement("span");
        this.elem.name = this.name;
        span.appendChild((new FieldLabel(this).render()));
        span.appendChild(this.elem);
        return span;
    };
    return SelectField;
}(InputField));
var Form = /** @class */ (function () {
    function Form(id) {
        if (id === void 0) { id = ""; }
        this.fields = [];
        this.form = document.createElement("form");
        this.id = id;
    }
    Form.prototype.getValue = function () {
        // let output: any = {};
        // for (let field of this.fields) {
        //     output[field.name] = field.getValue();
        // }
        // return output;
        //???
        for (var i = 0; i < this.fields.length; i++) {
            this.fields[i].value = this.fields[i].getValue();
        }
        return this;
    };
    Form.prototype.addField = function (field) {
        this.fields.push(field);
    };
    Form.prototype.render = function () {
        this.form.innerHTML = '';
        if (this.id) {
            var form = (new LocStorage()).loadForm(this.id);
            //console.log(form);
            //poprawic to
            this.fields = [];
            for (var _i = 0, _a = form.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                var f = new InputField(field.name, field.label, field.value);
                f.type = field.type;
                this.addField(f);
            }
        }
        for (var _b = 0, _c = this.fields; _b < _c.length; _b++) {
            var field = _c[_b];
            this.form.appendChild(field.render());
        }
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
        this.div = document.getElementById(id);
        this.div.innerHTML = "";
    }
    App.prototype.editDocument = function () {
        var type = Router.getParam('type');
        if (type && type == "form") {
            this.div.appendChild((new FormCreator).newForm());
            return;
        }
        var id = Router.getParam('id');
        if (id) {
            var formularz = new Form(id);
            // let dokument = (new DocumentList).getDocument(id);
            // let formularz = new Form(dokument);
            //console.log(dokument);
            // for(let key in dokument) {  
            //    console.log(key);
            ///  let f = new InputField(field.name, field.label, field.value);
            //  f.type = field.type;
            //  this.addField(f); 
            // }
            this.div.appendChild(formularz.render());
        }
    };
    App.prototype.newDocument = function () {
        var id = Router.getParam('id');
        if (id) {
            var formularz = new Form(id);
            //   formularz.addField(new InputField("imie", "Imię", dokument.imie));
            //   formularz.addField(new InputField("nazwisko", "Nazwisko", dokument.nazwisko));
            //   formularz.addField(new EmailField("email", "E-mail", dokument.email));
            //   formularz.addField(new SelectField("kierunek", ["Informatyka", "Ekonometria", "Kosmetologia"], "Wybrany kierunek studiów", dokument.kierunek));
            //   formularz.addField(new DateField("data", "Data", dokument.data));
            //   formularz.addField(new CheckboxField("elearning", "Czy preferujesz e-learning?", dokument.elearning));
            //   formularz.addField(new TextAreaField("uwagi", "Uwagi", dokument.uwagi));
            this.div.appendChild(formularz.render());
        }
    };
    App.prototype.documentList = function () {
        this.div.appendChild((new DocumentList()).render());
    };
    App.prototype.formList = function () {
        this.div.appendChild((new FormCreator()).formList());
    };
    return App;
}());
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.getParam = function (key) {
        var query = window.location.search.substr(1);
        var urlParams = new URLSearchParams(query);
        var id = urlParams.get(key);
        return id || "";
    };
    return Router;
}());
var LocStorage = /** @class */ (function () {
    function LocStorage() {
    }
    LocStorage.prototype.saveDocument = function (doc) {
        var id = 'document-' + Date.now().toString();
        localStorage.setItem(id, JSON.stringify(doc));
        var ids = this.getDocuments();
        ids.push(id);
        localStorage.setItem("ids", JSON.stringify(ids));
        return id;
    };
    LocStorage.prototype.removeDocument = function (id) {
        var ids = this.getDocuments();
        var i = ids.indexOf(id);
        if (i >= 0) {
            ids.splice(i, 1);
            localStorage.setItem("ids", JSON.stringify(ids));
            localStorage.removeItem(id);
        }
    };
    LocStorage.prototype.loadDocument = function (id) {
        return JSON.parse(localStorage.getItem(id) || "{}");
    };
    LocStorage.prototype.getDocuments = function () {
        return JSON.parse(localStorage.getItem("ids") || "[]");
    };
    LocStorage.prototype.saveForm = function (form) {
        var id = 'form-' + Date.now();
        localStorage.setItem(id, JSON.stringify(form));
        var ids = this.getDocuments();
        ids.push(id);
        localStorage.setItem("ids", JSON.stringify(ids));
        return id;
    };
    LocStorage.prototype.loadForm = function (id) {
        return this.loadDocument(id);
    };
    return LocStorage;
}());
