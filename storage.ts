interface DataStorage{
	saveDocument(doc: any): string;
	loadDocument(id: string): any;
	getDocuments(): string[];
}

class LocStorage implements DataStorage{

	saveDocument(doc: any, ident?: string): string {
		if(ident){
			localStorage.setItem(ident, JSON.stringify(doc));
			return ident;
		}
		const id = 'document-' + Date.now().toString();
		localStorage.setItem(id, JSON.stringify(doc));

		let ids = this.getDocuments();
		ids.push(id);
		localStorage.setItem("ids", JSON.stringify(ids));

		return id;
	}

    removeDocument(id: string){
        let ids = this.getDocuments();
        let i = ids.indexOf(id);
        if(i >= 0){
            ids.splice(i, 1);
            localStorage.setItem("ids", JSON.stringify(ids));
            localStorage.removeItem(id);
        }
    }

	loadDocument(id: string): any {
		return JSON.parse(localStorage.getItem(id) || "{}");
	}

	getDocuments(): string[] {
		return JSON.parse(localStorage.getItem("ids") || "[]");
	}

    saveForm(form: any): string {
        const id = 'form-' + Date.now();
		localStorage.setItem(id, JSON.stringify(form));
		
		let ids = this.getDocuments();
		ids.push(id);
		localStorage.setItem("ids", JSON.stringify(ids));

        return id;
    }

    public loadForm(id: string): any {
		let item = localStorage.getItem(id);
        if (item) {   
            let obj = JSON.parse(item);
            let form = new Form("formularz");
            for(let field of obj.fields) {  
                let f = new InputField(field.name, field.label, field.value);
                f.type = field.type;
                form.addField(f); 
            }
            return form;
        }
        return null;
    }


}
