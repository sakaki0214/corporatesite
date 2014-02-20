(function($) {
$(function(){
  var _imgNum = 0; //画像の枚数
  var _imgSize = 0; //画像のサイズ
  var _current = 0; //現在の画像
  var _timer = 3000;

  //各ボタンの配置
  $('.mainVisual').append('<a href="#"><img src="img/top/icon-arrow-l.png" id="btn-prev" /></a><a href="#"><img src="img/top/icon-arrow-r.png" id="btn-next" /></a><div id="pagenation"><ul></ul></div>');

  //画像サイズ取得
  _imgSize = $('#banner ul li').width();
  
  //メイン画像の数だけ繰り返す
  $('#banner ul li').each(function(){
    //画像をずらして外に配置
    $(this).css('margin-left', -_imgSize);
    //画像の数だけページネーションボタンを作成
    if (_imgNum == _current) {
      //currentだったらアクティブ
      $('#pagenation ul').append('<li class="active"><a href="#"><img src="img/common/sp.png" alt="" width="10" height="10" /></a></li>');
      //currentのメインの画像のみ表示
      $(this).css('margin-left', '0px');
    } else {
      $('#pagenation ul').append('<li><a href="#"><img src="img/common/sp.png" alt="" width="10" height="10" /></a></li>');
    }
    //ループの数をカウントして_imgNumに入れる
    _imgNum++;
  });
  
  //一定時間ごとにimageMoveを実行
  var loopSwitch = setInterval(loop, _timer);
  function loop() {
    imageMove(_current +1);
  }

  //ボタンをクリック
  $('#btn-next').click(function(e){
    e.preventDefault();
    imageMove(_current +1);
  });
  $('#btn-prev').click(function(e){
    e.preventDefault();
    imageMove(_current -1);
  });
  //ページネーションクリック
  $('#pagenation ul li').click(function(e) {
    e.preventDefault();
    var thisNum = $('#pagenation li').index(this);
    //押したボタンが現在の画像じゃなかったら実行
    if(thisNum  != _current) {
      imageMove(thisNum );
    }
  });

  function imageMove(next) {
    //ループ時間リセット
    clearInterval(loopSwitch);
    loopSwitch = setInterval(loop, _timer);
    //次の画像が次の画像より大きかったら右に配置（小さかったら左）
    var pos;
    if (_current < next) {
      pos = -_imgSize;
    } else {
      pos = _imgSize;
    }
    //次の画像が最後なら1枚目、1枚目なら最後
    if (next == _imgNum) {
      next = 0;
    } else if(next == -1) {
      next = (_imgNum-1);
    }
    //次の画像を配置してスライドさせる
    $("#banner li").eq(next)
    .css("margin-left", pos)
    .animate({
      marginLeft: "0"
    },"fast");
    //現在の画像を動かす
    $('#banner li').eq(_current)
    .animate({
      marginLeft: -pos
    },"fast");
    
    //ページネーション現在のを消し次をアクティブに
    $('#pagenation li').eq(_current).removeClass('active');
    $('#pagenation li').eq(next).addClass('active');
    //現在の番号を次の番号にする。
    _current = next;
  }
});
})(jQuery);