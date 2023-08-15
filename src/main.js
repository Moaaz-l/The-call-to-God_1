const { app, BrowserWindow, ipcMain, Notification , autoUpdater , dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const name = "MOAAZ";
const mo = ["السلام عليكم","وعليكم السلام"];
let i = 0;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let data = {};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "src/logo.png",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true // تفعيل عنصر webview
    },
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 20
    },
  });

  const notification = new Notification({
    body: mo[i],
    icon: "src/logo.png",
  });
  notification.show();

  ipcMain.on('save-data', (event, data) => {
    const filePath = path.join(__dirname, 'data.db');
    const jsonData = JSON.stringify(data);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error(err);
        event.sender.send('save-data-result', { success: false, error: err });
        return;
      }

      console.log('Data saved successfully');
      event.sender.send('save-data-result', { success: true });
    });
  });
  // and load the index.html of the app.
  // mainWindow.loadFile(
  //   path.join(__dirname, 'index.html')
  // );
  mainWindow.loadURL('name.js');
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // isO();
  }
});

setInterval(restart,2000);
function restart (){
  fs.writeFile('data.db', JSON.stringify(data), 'utf-8', (err) => {
    data = { "name" : name, "score": 7 };
    if (err) {
      console.error(err);
    }
  });
}

app.on('activate', () => {
  // mainWindow.webContents.on('did-finish-load', () => {
  //   // تحديث النتيجة في البيانات
  //   data.score += 10;
  //   // إرسال البيانات المحدثة إلى النافذة
  //   mainWindow.webContents.send('update-score', data.score);
  // });
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const updateOptions = {
  url: 'https://github.com/Moaaz-l/The-call-to-God_1', // عنوان URL لتحديث التطبيق
  channel: 'github', // قناة التحديث (اختياري)
};

app.on("ready", function(){
  autoUpdater.autoDownload = false; // للتحكم في عملية التحميل
  autoUpdater.allowDowngrade = false; // للسماح بالتنزيلات القديمة
  autoUpdater.autoInstallOnAppQuit = true; // لتثبيت التحديث عند إغلاق التطبيق

  // تخصيص نافذة الإعلام
  autoUpdater.setFeedURL(updateOptions);

  // استجابة لأحداث التحديث
  autoUpdater.on('update-available', () => {
    // اقتران رقم الإصدار المتاح مع تعبير خاص بك
    const version = autoUpdater.updateInfo.version;

    dialog.showMessageBox({
      type: 'info',
      title: 'تحديث متاح',
      message: `توجد نسخة جديدة من التطبيق (${version}) متاحة للتحميل والتثبيت.`,
      buttons: ['تحديث', 'إغلاق']
      }).then((response) => {
       if (response.response === 0) {
        autoUpdater.autoDownload = true; // للتحكم في عملية التحميل
       }
     });

    // عرض رسالة إعلام مخصصة للمستخدم
    // يمكنك استخدام إطار عمل مثل "dialog" في Electron لإنشاء رسالة مخصصة
    // وعرضها للمستخدم
  });
})

// داخل حدث "update-available"

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.