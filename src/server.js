const express = require('express');
const app = express();

// تعيين نوع MIME لملفات الـ JavaScript
app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

// تعيين نقطة النهاية لـ index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'src/index.html');
});


// تشغيل الخادم على المنفذ 3000 (يمكنك تغييره إلى المنفذ المطلوب)
app.listen(3000, () => {
  console.log('الخادم يعمل على المنفذ 3000');
});