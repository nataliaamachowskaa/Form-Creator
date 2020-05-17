class DocumentList{
    list: string[] = [];
    ls: LocStorage = new LocStorage();
    constructor(){
        this.getDocumentList();
    }

    getDocumentList(){
       this.list = this.ls.getDocuments();
    }

    private generateTableHead(table: HTMLTableElement, data: any) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key in data) {
          let th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
        }
    }

    private generateRow(table: HTMLTableElement, data: any) {
        let row = table.insertRow();
        for (let key in data) {
            let cell = row.insertCell();
            let text = document.createTextNode(data[key]);
            cell.appendChild(text);
        }
    }

    render(){
        let table = document.createElement("table");
        let doc = this.ls.loadDocument(this.list[0]);
        if(doc){
            this.generateTableHead(table, doc);
            for(var id of this.list){
                doc = this.ls.loadDocument(id);
                this.generateRow(table, doc);
            }       
        }
        return table;   
    }
}