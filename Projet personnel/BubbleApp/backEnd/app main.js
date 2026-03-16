const { app, BrowserWindow, screen, globalShortcut , ipcMain} = require('electron');
const path = require("node:path");


let clickThrough = true;
let win;
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width,
        height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
        }
    })

    win.loadFile('frontEnd/main.html');
    win.setIgnoreMouseEvents(false);
    win.setIgnoreMouseEvents(clickThrough, { forward: true });
    return win;
}

function transparent_api(){
    globalShortcut.register('CommandOrControl+D', () => {
        clickThrough = !clickThrough;
        win.setIgnoreMouseEvents(clickThrough, {forward: true});
        if (!clickThrough) {
            win.focus();
        }
        console.log(`Click-through mode: ${clickThrough}`);
    })

    ipcMain.handle('changeState', () => {
        clickThrough = !clickThrough;
        win.setIgnoreMouseEvents(clickThrough, { forward: true });
        if (!clickThrough) {
            win.focus();
        }
        console.log(`[BUTTON] Click-through mode: ${clickThrough}`);
        return clickThrough;
    })
    ipcMain.on('toTrue', () => {
        if(!clickThrough) {
            clickThrough = true;
            win.setIgnoreMouseEvents(clickThrough, { forward: true });
            console.log(`[DIRECT] Click-through mode: true`);
        }
    })
    ipcMain.on('toFalse', () => {
        if(clickThrough) {
            clickThrough = false;
            win.setIgnoreMouseEvents(clickThrough, { forward: true });
            console.log(`[DIRECT] Click-through mode: false`);
        }
    })
    ipcMain.handle('getClickThrough', () => {
        return clickThrough;
    })
    ipcMain.on('focus' , () => {
        win.focus();
    })

    app.on('window-all-closed', async () => {
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('will-quit', () => {
        // unregister all shortcuts
        globalShortcut.unregisterAll();
    });
}

app.whenReady().then(() => {
    win = createWindow();
    transparent_api()
});

