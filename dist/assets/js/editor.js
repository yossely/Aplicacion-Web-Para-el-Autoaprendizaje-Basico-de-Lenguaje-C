var editor = ace.edit("editor"); //editor is the 'id' attribute for the 'pre' element
editor.setTheme("ace/theme/clouds");
editor.session.setMode("ace/mode/c_cpp");
document.getElementById('editor').style.fontSize = '14px';
document.getElementById('editor').style.backgroundColor = '#E4FDE1';
var btn_run_code = document.getElementById('btn-run-code');
btn_run_code.onclick = function () {
    console.log(editor.getValue());
};

//# sourceMappingURL=maps/editor.js.map
