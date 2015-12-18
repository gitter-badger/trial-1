//敢えて普段自分が書いているような超適当な試験的コードを晒します
//特に気持ち悪い所があったらどんどんご指摘を！

//ライブラリ読み込み
var url = require('url');
var esc_html = require('escape-html');
var express = require('express');

//express準備
var app = express();

//
app.get('/', function (req, res) {
  //出力用html
  var my_html='';

  //クエリ読み込み
  var url_info = url.parse(req.url, true);
  var test_name = url_info.query.test;
  my_html+=('<head><meta charset="utf-8"></head>');
  my_html+=('<body>');

  //入力があるかどうかで分岐
  if(!test_name){
    my_html+=('  <form>');
    my_html+=('    名前を入れてください<br>');
    my_html+=('    <input name="test">');
    my_html+=('    <input type="submit">');
    my_html+=('  </form>');
  }else{
    my_html+=('ようこそ' + esc_html(test_name) + 'さん');
  };
  my_html+=('</body>');
  res.send(my_html);
});

//webサーバ
var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
