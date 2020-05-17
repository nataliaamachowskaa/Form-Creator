interface DataStorage{
	saveDocument(doc: any): string;
	loadDocument(id: string): any;
	getDocuments(): string[];
}

class LocStorage implements DataStorage{

	saveDocument(doc: any): string {
		const id = Date.now().toString();
		localStorage.setItem(id, JSON.stringify(doc));

		let ids = this.getDocuments();
		ids.push(id);
		localStorage.setItem("ids", JSON.stringify(ids));

		return id;
	}

	loadDocument(id: string): any {
		return JSON.parse(localStorage.getItem(id) || "{}");
	}

	getDocuments(): string[] {
		return JSON.parse(localStorage.getItem("ids") || "[]");
	}
}
