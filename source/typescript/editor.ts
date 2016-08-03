/// <reference path="../../typings/globals/ace/index.d.ts" />;

export class MyEditor {
	
	divId: string;  //'id' attribute for the 'pre' element
	editor: AceAjax.Editor;

	constructor(divId: string) {
		this.divId = divId;
	}

	InitializeEditor() {
		this.editor = ace.edit(this.divId);
		this.editor.setTheme("ace/theme/clouds");
		this.editor.session.setMode("ace/mode/c_cpp");

		document.getElementById(this.divId).style.fontSize='14px';

		document.getElementById(this.divId).style.backgroundColor='#E4FDE1';
	}
}