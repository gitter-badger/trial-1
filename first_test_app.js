//敢えて普段自分が書いているような超適当な試験的コードを晒します
//特に気持ち悪い所があったらどんどんご指摘を！
//追記：さすがに人様に見せるコードとしてあまりにもだらしなかったと思います。お見苦しいコードをお見せして申し訳ないです。
'use strict';//ES6対策

//okada:こんなに適当に関数に切り分けても余計気持ち悪いとは思いますがとりあえず。近いうちに自分なりにちゃんとオブジェクト指向で書いてcommitします。
function prepare_output_html_body(user_name){
  var output_html_body = '';
  //入力があるかどうかで分岐
  //Q4："res.writeHead()"は不要でしょうか？node分かってなくてごめんなさい//okada:もちろんあった方が良いですよね
  if(!user_name) {//Q3：どんな値が入るんでしょう？//okada:今はuser_nameが入力されているかどうかの簡易判定です。例外処理とかもちゃんとしないとともちろん思ってます。
    output_html_body+=('    <form>');
    output_html_body+=('      名前を入れてください<br>');
    output_html_body+=('      <input name="user_name">');
    output_html_body+=('      <input type="submit">');
    output_html_body+=('    </form>');
  }else{
    output_html_body+=('ようこそ' + escape_html(user_name) + 'さん');
  };
  return output_html_body;
}

//モジュール読み込み
var url = require('url');
//var esc_html = require('escape-html');
//var escape-html = require('escape-html');//node-moduleと変数の見分けがつきづらいので、module系については略さない方がgoodだと思います
var escape_html = require('escape-html');
//okada:その通りですね。でもハイフンはアンダーバーとかに直すしかないですよね。
var express = require('express');

//express準備
var app = express();

app.get('/', function (req, res) {
  //出力用html
  var whole_output_html = '';

  //クエリ読み込み
  var parsed_url = url.parse(req.url, true);
  var user_name = parsed_url.query.user_name;
  whole_output_html += '<!DOCTYPE html>';
  whole_output_html += '<html>';
  whole_output_html += '  <head>';
  whole_output_html += '    <meta charset="utf-8">';
  whole_output_html += '  </head>';//Q1：文字列結合の時に()を付けるのはnodeのルール？//okada:要らないです
  whole_output_html += '  <body>';
  whole_output_html += prepare_output_html_body(user_name);
  whole_output_html += '  </body>';
  whole_output_html += '</html>';

  res.send(whole_output_html);
});

//webサーバ
var server = app.listen(5000, function () {
  //Q5：host,portは何に使ってるんですか？ //サーバー側でログの出力
  var host = server.address().address;
  var port = server.address().port;
  console.log("opened server on %j %j", host, port);
});
