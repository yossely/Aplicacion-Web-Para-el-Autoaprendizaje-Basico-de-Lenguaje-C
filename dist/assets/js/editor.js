/// <reference path="../../typings/globals/ace/index.d.ts" />;
"use strict";
class MyEditor {
    constructor(divId) {
        this.divId = divId;
    }
    InitializeEditor() {
        this.editor = ace.edit(this.divId);
        this.editor.setTheme("ace/theme/clouds");
        this.editor.session.setMode("ace/mode/c_cpp");
        document.getElementById(this.divId).style.fontSize = '14px';
        document.getElementById(this.divId).style.backgroundColor = '#E4FDE1';
        var btn_run_code = document.getElementById('btn-run-code');
        btn_run_code.onclick = function () {
            console.log(this.editor.getValue());
        };
    }
}
exports.MyEditor = MyEditor;

//# sourceMappingURL=maps/editor.js.map
