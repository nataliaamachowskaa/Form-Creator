class DocumentList{
    list: string[] = [];
    ls: LocStorage = new LocStorage();
    constructor(){
        this.getDocumentList();
    }

    getDocumentList(){
       this.list = this.ls.getDocuments();
       return this.list;
    }

    getDocument(id: string): any {
        return this.ls.loadDocument(id);
    }

    removeDocument(id: string){
        this.ls.removeDocument(id);
    }

    render(){
        let table = document.createElement("table");
        for (let id of this.list) {
            if (id.substr(0, 4) == 'form') continue;
            let tr = table.insertRow();
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(id));
            a.href = 'edit-document.html?id=' + id;
            tr.insertCell().appendChild(a);

            let button = document.createElement('button');
            button.type = 'button';
            button.textContent = 'Usuń';
            button.onclick =  function(that, id){ return function(){ that.removeDocument(id);  window.location.reload(); }}(this, id);
            tr.insertCell().appendChild(button);    
        }
        return table;   
    }
}