let scormAPI = null;
let jáConcluiu = false;

function findAPI(win) {
    let findAttempts = 0;
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
        findAttempts++;
        if (findAttempts > 10) return null;
        win = win.parent;
    }
    return win.API;
}
function initSCORM() {
    scormAPI = findAPI(window);
    if (scormAPI == null && window.opener != null) scormAPI = findAPI(window.opener);
    if (scormAPI) {
        scormAPI.LMSInitialize("");
        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");
    }
}
function completeSCORM() {
    if (jáConcluiu) return;
    jáConcluiu = true;
    
    if (scormAPI) {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");
        scormAPI.LMSCommit("");
        scormAPI.LMSFinish("");
        console.log("SCORM: Status alterado para completed automaticamente.");
    } else {
        console.log("Modo Sandbox: Conclusão automática simulada (lesson_status: completed).");
    }
}
