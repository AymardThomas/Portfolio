const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("kelp", {
    world: () => "theworld"
})


contextBridge.exposeInMainWorld("ClickThrough", {
    changeState: () =>
        ipcRenderer.invoke('changeState')
    ,
    toTrue: () => {
        ipcRenderer.send('toTrue')
    },
    toFalse: () => {
        ipcRenderer.send('toFalse')
    },
    getClickThrough: () => ipcRenderer.invoke('getClickThrough')
})

contextBridge.exposeInMainWorld("win", {
    focus: () => {
        ipcRenderer.send('focus')
    }
})

