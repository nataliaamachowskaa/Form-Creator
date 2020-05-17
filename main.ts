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
  label: FieldLabel,
  type: FieldType,
  value: string,
  render(): HTMLElement
}

class FieldLabel {
  private el: HTMLLabelElement;
  constructor(name, text: string) {
    this.el = document.createElement("label");
    this.el.textContent = text;
    this.el.htmlFor = name;
  }
  render(){
      return this.el;
  }
}

class InputField implements Field {
  private
      name: string; 
      label: FieldLabel;
      type: FieldType;
      value: string;

  constructor(name, label: string){
      this.name = name;
      this.label = new FieldLabel(this.name, label);
      this.type = FieldType.Text;
      this.value = "";
  }
  render() {
      let span = document.createElement("span");
      let input: any;
      if (this.type == FieldType.Textarea) {
          input = document.createElement("textarea");
      }
      else {
          input = document.createElement("input");
          input.type = this.type.toString();
      }
      input.name = this.name;
      input.value = this.value;  
      span.appendChild(this.label.render());
      span.appendChild(input);
      span.appendChild(document.createElement('br'));
      return span;
  }

}

class DateField extends InputField{
  constructor(name, label: string){
      super(name, label);
      this.type = FieldType.Date;
  }
}

class EmailField extends InputField{
  constructor(name, label: string){
      super(name, label);
      this.type = FieldType.Email;
  }
}

class CheckboxField extends InputField{
  constructor(name, label: string){
      super(name, label);
      this.type = FieldType.Checkbox;
  }
}

class TextAreaField extends InputField{
  constructor(name, label: string){
      super(name, label);
      this.type = FieldType.Textarea;
  }
}


let i =  new InputField("input1", "pole tekstowe");
let d =  new DateField("date1", "data");
let e =  new EmailField("email1", "e-mail");
let c =  new CheckboxField("checkbox1", "checkbox");
let t =  new TextAreaField("textare1", "textarea");

document.addEventListener('DOMContentLoaded', function(event) {

  let div = document.getElementById("test");

  div.appendChild(i.render());
  div.appendChild(d.render());
  div.appendChild(e.render());
  div.appendChild(c.render());
  div.appendChild(t.render());
})
