enum FieldType {
    Text = "text",
    Textarea = "textarea",
    Date = "date",
    Email = "email", 
    Select = "select",
    Checkbox = "checkbox"
}

interface Field {
    name: string,
    label: string,
    type: FieldType,
    getValue(): string,
    render(): HTMLElement
}

class FieldLabel {
    private label: HTMLLabelElement;
    constructor(name: string, text: string) {
        this.label = document.createElement("label");
        this.label.textContent = text;
        this.label.htmlFor = name;
    }
    
    render(){
        return this.label;
    }
}
    
class InputField implements Field {
    name: string; 
    label: string;
    type: FieldType = FieldType.Text;
    protected elem: any;
        
    getValue(): string {
        return this.elem.value.toString();
    }
    
    constructor(name: string, label = ""){
        this.name = name;
        this.label = label;
    }
    
    render() {
        let span = document.createElement("span");
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
    }
}

class DateField extends InputField{
    type = FieldType.Date;
}

class EmailField extends InputField{
    type = FieldType.Email;
}

class CheckboxField extends InputField{
    type = FieldType.Checkbox;
    getValue(): string {
        return this.elem.checked ? "Tak" : "Nie";
    }
}

class TextAreaField extends InputField{
    type = FieldType.Textarea;
}

class SelectField extends InputField{
    type = FieldType.Select;

    constructor(name: string, options: string[], label = ""){
        super(name, label);
        this.elem = document.createElement("select");
        for (var option of options) {
            this.addOption(option);
        }
    }

    private addOption(text: string){
        let o = document.createElement('option'); 
        o.text = text;
        this.elem.add(o);
    }

    render() {
        let span = document.createElement("span");
        this.elem.name = this.name;
        span.appendChild((new FieldLabel(this.name, this.label).render()));
        span.appendChild(this.elem);
        return span;
    }      
}

class Form {
    private fields: Field[] = [];
    private form: HTMLFormElement;

    constructor(name: string){
        this.form = document.createElement("form");
        this.form.name = name;

        this.fields.push(new InputField("imie", "Imię"));
        this.fields.push(new InputField("nazwisko", "Nazwisko"));
        this.fields.push(new EmailField("email", "E-mail"));
        this.fields.push(new SelectField("kierunek", ["Informatyka", "Ekonometria", "Kosmetologia"], "Wybrany kierunek studiów"));
        this.fields.push(new DateField("data", "Data"));
        this.fields.push(new CheckboxField("elearning", "Czy preferujesz e-learning?"));
        this.fields.push(new TextAreaField("uwagi", "Uwagi"));

        for (var field of this.fields) {
            this.form.appendChild(field.render());
        }
    }

    getValue(){ 
        let output: {[k: string]: any} = {};
        for (var field of this.fields) {
            output[field.name] = field.getValue();
        }
        return output;
    }

    render(){
        let button = document.createElement('input');
        button.type = 'button';
        button.value = 'Zapisz';
        button.onclick =  function(form){ return function(){  form.save(); }}(this);

        let button2 = document.createElement('input');
        button2.type = 'button';
        button2.value = 'Wstecz';
        button2.onclick = function(){ window.location.href = "index.html"; }

        this.form.appendChild(button);
        this.form.appendChild(button2);

        return this.form;
    }

    save(){
        (new LocStorage()).saveDocument(this.getValue());
        window.location.href = "index.html";
    }
}

class App {
    formularz: Form = new Form("formularz");
    constructor(id: string){
        let div = document.getElementById(id);
        if (div) div.appendChild(this.formularz.render());
    }
}

