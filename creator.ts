class FormCreator
{
    private form: HTMLFormElement;
    private formularz: Form;
    private div: HTMLDivElement;
    private content: HTMLDivElement;
    private button: HTMLInputElement;
    private fields: Field[] = [];
    constructor()
    {
        this.form = document.createElement("form");
        this.formularz = new Form("formularz");
        this.div = document.createElement("div");
        this.content = document.createElement("div");

        this.fields.push(new SelectField("type", ["Pole tekstowe", "Pole wielolinijkowe", "Data", "E-mail", "Checkbox"], "Typ pola", ""));
        this.fields.push(new InputField("name", "Nazwa", ""));
        this.fields.push(new InputField("label", "Etykieta", ""));
        this.fields.push(new InputField("value", "Domyślna wartość", ""));

        for (let field of this.fields) {
            this.form.appendChild(field.render());
        }

        this.button = document.createElement('input');
        this.button.type = 'button';
        this.button.value = 'Dodaj pole';
        this.button.onclick = function(that){ return function(){ 
            switch(that.fields[0].getValue()) {
                case "Pole tekstowe": that.formularz.addField(new InputField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue())); break;
                case "Pole wielolinijkowe": that.formularz.addField(new TextAreaField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue())); break;
                case "Data": that.formularz.addField(new DateField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue())); break;
                case "E-mail": that.formularz.addField(new EmailField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue())); break;
                case "Checkbox": that.formularz.addField(new CheckboxField(that.fields[1].getValue(), that.fields[2].getValue(), that.fields[3].getValue())); break;            
            }         
            that.div.innerHTML = "";
            that.div.appendChild(that.formularz.render());
        }}(this);
        this.form.appendChild(this.button);
        
        let button1 = document.createElement('input');
        button1.type = 'button';
        button1.value = 'Zapisz';
        button1.onclick = function(that){ return function(){ that.saveForm(); }}(this);
        this.form.appendChild(button1);

        this.content.appendChild(this.div);
        this.content.appendChild(document.createElement('hr'));
        this.content.appendChild(this.form);
    }

    public newForm(): any {        
       // let id = Router.getParam('id');
       // if(id) {
         //   this.formularz = (new LocStorage).loadForm(id);
         //   this.div.innerHTML = "";
         //   this.div.appendChild(this.formularz.render());
        //}
        this.formularz = new Form();
        return this.content;
    }

    public saveForm() {
        (new LocStorage).saveForm(this.formularz);
        window.location.href = "index.html";
    }


    public formList() {
        let table = document.createElement("table");
        let list = new DocumentList().getDocumentList();

        //console.log(list);
        for (let id of list) {
            if (id.substr(0, 4) != 'form') continue;

            let tr = table.insertRow();
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(id));
            a.href = 'new-document.html?id=' + id;
            tr.insertCell().appendChild(a);

            let button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'Usuń';
            button.onclick =  function(id){ return function(){ 
                new DocumentList().removeDocument(id); 
                window.location.reload(); 
            }}(id);
            tr.insertCell().appendChild(button);    
        }
        return table;   
    }



}