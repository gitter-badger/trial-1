//敢えて普段自分が書いているような超適当な試験的コードを晒します
//特に気持ち悪い所があったらどんどんご指摘を！
'use strict';//ES6対策
//ライブラリ読み込み
var url = require('url');
//var esc_html = require('escape-html');
var escape-html = require('escape-html');//node-moduleと変数の見分けがつきづらいので、module系については略さない方がgoodだと思います
var express = require('express');

//express準備
var app = express();

//
app.get('/', function (req, res) {
  //出力用html
  //var my_html='';
  var output_html_body = '';

  //クエリ読み込み
  //var url_info = url.parse(req.url, true);
  var parsed_url = url.parse(req.url, true);
  //var test_name = url_info.query.test;
  var query_name = parsed_url.query.test;
  //Q2：<!DOCTYPE html>が不要でしょうか？
  my_html+=('<head><meta charset="utf-8"></head>');//Q1：文字列結合の時に()を付けるのはnodeのルール？
  my_html+=('<body>');

  //入力があるかどうかで分岐
  //if(!test_name){
  //Q4："res.writeHead()"は不要でしょうか？node分かってなくてごめんなさい
  if(!query_name) {//Q3：どんな値が入るんでしょう？
    my_html+=('  <form>');
    my_html+=('    名前を入れてください<br>');
    my_html+=('    <input name="test">');
    my_html+=('    <input type="submit">');
    my_html+=('  </form>');
  }else{
    my_html+=('ようこそ' + esc_html(test_name) + 'さん');
  };
  my_html+=('</body>');
  //</html>
  res.send(my_html);
});

//webサーバ
var server = app.listen(5000, function () {
  //Q5：host,portは何に使ってるんですか？
  var host = server.address().address;
  var port = server.address().port;
});
