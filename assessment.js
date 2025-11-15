`use strict`;
const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assessment`);
const resultDivision = document.getElementById(`result-area`);
const tweetDivision = document.getElementById(`tweet-area`);

//Enterでも反応するように
userNameInput.addEventListener(
  `keydown`,
  (event) => {
    if(event.code === `Enter`) {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

assessmentButton.addEventListener(
  `click`,
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      //名前が空の時は終了する
      return;
    }

    //診断結果表示エリアの作成
    resultDivision.innerText = ``;
    const header = document.createElement(`h3`);
    header.innerText = `診断結果`;
    resultDivision.appendChild(header);

    const paragraph = document.createElement(`p`);
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    //ツイートエリアの作成
    tweetDivision.innerText = ``;
    const anchor = document.createElement(`a`);
    const hrefValue =
    `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent(`あなたに似ているアイドル`)}&ref_src=twsrc%5Etfw`;

    anchor.setAttribute(`href`,hrefValue);
    anchor.setAttribute(`class`,`twitter-hashtag-button`);
    anchor.setAttribute(`data-text`,result);
    anchor.innerText = `Tweet #あなたに似ているアイドル`;

    tweetDivision.appendChild(anchor);
    
    const script = document.createElement(`script`);
    script.setAttribute(`src`,`https://platform.twitter.com/widgets.js`);
    tweetDivision.appendChild(script);
  }
);

const answers = [
  `###userName###に似ているアイドルは春日未来です。趣味は「可愛い髪留めを集めること」。`,
  `###userName###に似ているアイドルは最上静香です。趣味は「テニス」。`,
  `###userName###に似ているアイドルは伊吹翼です。趣味は「遊びの計画をたてること」。`,
  `###userName###に似ているアイドルは田中琴葉です。趣味は「お風呂」。`,
  `###userName###に似ているアイドルは島原エレナです。趣味は「パーティー」。`,
  `###userName###に似ているアイドルは佐竹美奈子です。趣味は「格闘ゲーム」。`,
  `###userName###に似ているアイドルは所恵美です。趣味は「カラオケ」。`,
  `###userName###に似ているアイドルは徳川まつりです。趣味は「漫画あつめ」。`,
  `###userName###に似ているアイドルは箱崎星梨花です。趣味は「バイオリン」。`,
  `###userName###に似ているアイドルは野々原茜です。趣味は「スキップ」。`,
  `###userName###に似ているアイドルは望月杏奈です。趣味は「オンラインゲーム」。`,
  `###userName###に似ているアイドルはコロちゃん・・・ロコです。趣味は「物を作ること」。`,
  `###userName###に似ているアイドルは七尾百合子です。趣味は「読書」。`,
  `###userName###に似ているアイドルは高山紗代子です。趣味は「ハリネズミの飼育、日記」。`,
  `###userName###に似ているアイドルちゃんは松田亜利沙です。趣味は「アイドルのデータ。集め、カメラ」`,
  `###userName###に似ているアイドルは高坂海美です。趣味は「ボルダリング」。`,
  `###userName###に似ているアイドルは中谷育です。趣味は「アニメ鑑賞」。`,
  `###userName###に似ているアイドルは天空橋朋花です。趣味は「ファンに喜んでもらうこと」。`,
  `###userName###に似ているアイドルはエミリーでしゅ。趣味は「かるた遊び」。`,
  `###userName###に似ているアイドルは北沢志保です。趣味は「お気に入りの絵本を探すこ。と」`,
  `###userName###に似ているアイドルは舞浜歩です。趣味は「ショッピング」。`,
  `###userName###に似ているアイドルは木下ひなたです。趣味は「ガーデニング」。`,
  `###userName###に似ているアイドルは矢吹可奈です。趣味は「なんでも歌にすること」。`,
  `###userName###に似ているアイドルは横山奈緒です。趣味は「銭湯＆温泉巡り」。`,
  `###userName###に似ているアイドルは二階堂千鶴です。趣味は「カフェでアパレル誌チェ。ック」`,
  `###userName###に似ているアイドルは馬場このみです。趣味は「北米ドラマ鑑賞」。`,
  `###userName###に似ているアイドルは大神環です。趣味は「探検」。`,
  `###userName###に似ているアイドルは豊川風花です。趣味は「献血」。`,
  `###userName###に似ているアイドルは宮尾美也です。趣味は「囲碁、将棋」。`,
  `###userName###に似ているアイドルは福田のり子です。趣味は「格闘技観戦」。`,
  `###userName###に似ているアイドルは真壁瑞希です。趣味は「手品」。`,
  `###userName###に似ているアイドルは篠宮可憐です。趣味は「アロマテラピー」。`,
  `###userName###に似ているアイドルは百瀬莉緒です。趣味は「ヨガエクササイズ」。`,
  `###userName###に似ているアイドルは永吉昴です。趣味は「野球」。`,
  `###userName###に似ているアイドルは北上麗花です。趣味は「登山」。`,
  `###userName###に似ているアイドルは周防桃子です。趣味は「かわいいシール集め」。`,
  `###userName###に似ているアイドルはジュリアです。趣味は「なし」。`,
  `###userName###に似ているアイドルは白石紬です。趣味は「庭園、甘味処の散策」。`,
  `###userName###に似ているアイドルは桜守歌織です。趣味は「乗馬」。`,
]

/**
 * 名前の文字列を渡すと診断結果を出力する関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i <userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode %answers.length;
  let result = answers[index];

  result = result.replaceAll(`###userName###`,userName);
  return result;
}


