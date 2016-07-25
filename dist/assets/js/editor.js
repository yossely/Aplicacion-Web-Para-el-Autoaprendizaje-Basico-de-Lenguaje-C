/// <reference path="../../typings/globals/ace/index.d.ts" />;
// var btn_begin = document.getElementById('btn-begin');
// btn_begin.onclick = function (){
// alert("sndoasd");
var editor = ace.edit("editor"); //editor is the 'id' attribute for the 'pre' element
editor.setTheme("ace/theme/clouds");
editor.session.setMode("ace/mode/c_cpp");
document.getElementById('editor').style.fontSize = '14px';
document.getElementById('editor').style.backgroundColor = '#E4FDE1';
var btn_run_code = document.getElementById('btn-run-code');
btn_run_code.onclick = function () {
    console.log(editor.getValue());
};
var editor_exercise1 = ace.edit("editor-exercise1"); //editor is the 'id' attribute for the 'pre' element
editor_exercise1.setTheme("ace/theme/clouds");
editor_exercise1.session.setMode("ace/mode/c_cpp");
document.getElementById('editor-exercise1').style.fontSize = '14px';
document.getElementById('editor-exercise1').style.backgroundColor = '#E4FDE1';
var btn_run_code = document.getElementById('btn-run-code-exercise1');
btn_run_code.onclick = function () {
    console.log(editor_exercise1.getValue());
};
// } 

//# sourceMappingURL=maps/editor.js.map
