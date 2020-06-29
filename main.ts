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
    value: string|boolean,
    getValue(): string,
    render(): HTMLElement
}

class FieldLabel {
    private label: HTMLLabelElement;
    constructor(field: Field) {
        this.label = document.createElement("label");
        this.label.textContent = field.label;
        this.label.htmlFor = field.name;
    }
    
    render(){
        return this.label;
    }
}
    
class InputField implements Field {
    name: string; 
    label: string;
    value: string|boolean;
    type: FieldType = FieldType.Text;
    protected elem: any;
        
    getValue(): string {
        return (this.type == FieldType.Checkbox) ? this.elem.checked : this.elem.value;
    }
    
    constructor(name: string, label: string, value: string|boolean){
        this.name = name;
        this.label = label;
        this.value = value;
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
        if (this.type == FieldType.Checkbox) {
            this.elem.checked = this.value;
        } 
        else {
            this.elem.value = this.value;
        } 
        span.appendChild((new FieldLabel(this).render()));
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
        return this.elem.checked;
    }
}

class TextAreaField extends InputField{
    type = FieldType.Textarea;
}

class SelectField extends InputField{
    type = FieldType.Select;

    constructor(name: string, options: string[], label: string, value: string){
        super(name, label, value);
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
        if(this.value){
            for(let i = 0; i < this.elem.options.length; i++){
                if(this.elem.options[i].text == this.value){
                    this.elem.options.selectedIndex = i;
                    break;
                } 
            }
        }
        let span = document.createElement("span");
        this.elem.name = this.name;
        span.appendChild((new FieldLabel(this).render()));
        span.appendChild(this.elem);
        return span;
    }      
}

class Form {
    protected fields: Field[] = [];
    protected form: HTMLFormElement;
    public id: string;

    constructor(id: string = ""){
        this.form = document.createElement("form");
        this.id = id;
    }

    getValue(){ 
       // let output: any = {};
       // for (let field of this.fields) {
       //     output[field.name] = field.getValue();
       // }
       // return output;

       //???
       for (let i = 0; i < this.fields.length; i++) {
            this.fields[i].value = this.fields[i].getValue();
       }

       return this;
    }

    addField(field: Field){
        this.fields.push(field);
    }

    render(){
        this.form.innerHTML = '';
        if(this.id){
            let form = (new LocStorage()).loadForm(this.id);
            //console.log(form);

            //poprawic to
            this.fields = [];
            for(let field of form.fields) {  
                let f = new InputField(field.name, field.label, field.value);
                f.type = field.type;
                this.addField(f); 
            }

        }

        for (let field of this.fields) {
            this.form.appendChild(field.render());
        }

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
    private div: any;
    constructor(id: string){
        this.div = document.getElementById(id);
        this.div.innerHTML = "";
    }

    editDocument(){
        let type = Router.getParam('type');
        if(type && type == "form"){
            this.div.appendChild((new FormCreator).newForm());
            return;
         }

         let id = Router.getParam('id');   
         if(id){

            let formularz = new Form(id);  
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
    }

    newDocument(){
            let id = Router.getParam('id');   
            if(id){
                let formularz = new Form(id);
             //   formularz.addField(new InputField("imie", "Imię", dokument.imie));
             //   formularz.addField(new InputField("nazwisko", "Nazwisko", dokument.nazwisko));
             //   formularz.addField(new EmailField("email", "E-mail", dokument.email));
             //   formularz.addField(new SelectField("kierunek", ["Informatyka", "Ekonometria", "Kosmetologia"], "Wybrany kierunek studiów", dokument.kierunek));
             //   formularz.addField(new DateField("data", "Data", dokument.data));
             //   formularz.addField(new CheckboxField("elearning", "Czy preferujesz e-learning?", dokument.elearning));
             //   formularz.addField(new TextAreaField("uwagi", "Uwagi", dokument.uwagi));
                this.div.appendChild(formularz.render());
            }
    }

    documentList(){
        this.div.appendChild((new DocumentList()).render());
    }

    formList(){
        this.div.appendChild((new FormCreator()).formList());
    }

}

