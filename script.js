'use strict';



//--------------------------------------------------------------------------

//                        ----- Memory Card Game -----
//--------------------------------------------------------------------------


// const cards = document.querySelectorAll('.memory-card');
  // cards.forEach(card => {
  //   card.addEventListener('click', flipCard);
  // });

// let hasflippedCard = false; 
// let firstCard, secondCard;

// function flipCard() {
//   this.classList.add('js_flip');  // toggle first
//   // console.log('clicked');
//   console.log(this);
//   if(!hasflippedCard) {  // false 初期設定の為 1枚目はここが実行!
//     // first Click!
//     hasflippedCard = true;
//     firstCard = this;     // 1枚目に click要素が 代入され 区別化定義!
//   } else {                // true が代入され 2枚目はここが実行!
//     // second click!
//     hasflippedCard = false;   // 更に false が代入され リセットされる!
//     secondCard = this;        // 2枚目に click要素が 代入され 区別化定義!
//     console.log(firstCard, secondCard);
//     console.log(firstCard.dataset.framework, secondCard.dataset.framework);
//     // 二枚目を捲ったところで 合致判定!
//     if(firstCard.dataset.framework === secondCard.dataset.framework) {
//       firstCard.removeEventListener('click', flipCard);  // disabled!
//       secondCard.removeEventListener('click', flipCard);
//       console.log('match');
//       // match 合致判定!  判定する為 カードを差別化する!
//       // 1. data-属性を html img-wrapper に添付
//       // 2. その値(dataset)で比較を取る
//     } else {
//       setTimeout(() => {  // classList.remove に時間差をつける!
//         firstCard.classList.remove('js_flip');  // auto flip back!
//         secondCard.classList.remove('js_flip');
//       }, 1500);
//     }
//   }
// }

//--------------------------------------------------------------------------
// コンソール コメント 無し ---

// const cards = document.querySelectorAll('.memory-card');
//   cards.forEach(card => {
//     card.addEventListener('click', flipCard);
//   });

// let hasflippedCard = false; 
// let firstCard, secondCard;

// function flipCard() {
//   this.classList.add('js_flip');
//   if(!hasflippedCard) {
//     hasflippedCard = true;
//     firstCard = this;
//   } else {
//     hasflippedCard = false;
//     secondCard = this;
//     if(firstCard.dataset.framework === secondCard.dataset.framework) {
//       firstCard.removeEventListener('click', flipCard);
//       secondCard.removeEventListener('click', flipCard);
//     } else {
//       setTimeout(() => {
//         firstCard.classList.remove('js_flip');
//         secondCard.classList.remove('js_flip');
//       }, 1500);
//     }
//   }
// }

//--------------------------------------------------------------------------
// リファクタ 1. ---

// const cards = document.querySelectorAll('.memory-card');
//   cards.forEach(card => {
//     card.addEventListener('click', flipCard);
//   });

// let hasFlippedCard = false; 
// let firstCard, secondCard;

// function flipCard() {
//   this.classList.add('js_flip');
//   if(!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;
//   } else {
//     hasFlippedCard = false;
//     secondCard = this;
//     checkForMatch();
//   }
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === 
//     secondCard.dataset.framework;
//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);
// }

// function unflipCards() {
//   setTimeout(() => {
//     firstCard.classList.remove('js_flip');
//     secondCard.classList.remove('js_flip');
//   }, 1500);
// }

//--------------------------------------------------------------------------
//  ロックを設置, dblClick を防止, リセットを配置 ---  完成真近! ---


// const cards = document.querySelectorAll('.memory-card');
//   cards.forEach(card => {
//     card.addEventListener('click', flipCard);
//   });

// let hasFlippedCard = false; 
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//   if(lockBoard) return;               // lock board を設置処理!
//   if(this === firstCard) return;     // dblClick を防止する処理!

//   this.classList.add('js_flip');
//   if(!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;
//   } else {
//     hasFlippedCard = false;
//     secondCard = this;
//     checkForMatch();
//   }
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === 
//     secondCard.dataset.framework;
//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);
// }

// function unflipCards() {
//   lockBoard = true;                               // lock board 値を設置!
//   setTimeout(() => {
//     firstCard.classList.remove('js_flip');
//     secondCard.classList.remove('js_flip');
//     lockBoard = false;                           // lock board 値を設置!
//     firstCard = null;                           // reset 配置!
//   }, 1500);
// }


//--------------------------------------------------------------------------
// ランダムに配置,  カードをシャッフル,  ゲームのリセット ---  完成版 ---


const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;
let matchedCard = 0;

function flipCard(e) {
  e.preventDefault
    if(lockBoard) return;               
    if(this === firstCard) return;     
  this.classList.add('js_flip');
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === 
    secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  // console.log(firstCard.children[0].src); // match要素のsrc取得
  // console.log(secondCard);
  resetGame();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('js_flip');
    secondCard.classList.remove('js_flip');
    lockBoard = false;
    firstCard = null;
  }, 1500);
}

function resetGame() {
  matchedCard++
  if(matchedCard === cards.length / 2) {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}

//------------------------------------------
// shuffle 1. ---

(function shuffleCards() {
  const number = [];
  for (let i = 0; i < cards.length; i++) {
    number[i] = i + 1;
  }
  number.sort(value => {
    return  0.5 - Math.random();
  });console.log(number);
  
  cards.forEach(card => {
    const orderNumber = 
    number.splice(Math.floor(Math.random() * number.length), 1);
    card.style.order = orderNumber;
    console.log(orderNumber);
  });
})();

//------------------------------------------------------
// shuffle 2. ---

// (function shuffleCards() {
//   const number = [];
//   for (let i = 0; i < cards.length; i++) {
//     number[i] = i + 1;
//   } console.log(number);
//   cards.forEach(card => {
//     card.style.order = number.sort(value => {
//       return 0.5 - Math.random();
//     })[0]; console.log(number);
//   });
// })();

//------------------------------------------------------
// shuffle 3. ---

// (function shuffleCards() {
//   cards.forEach(card => {
//     const randomNumber = Math.floor(Math.random() * cards.length);
//     card.style.order = randomNumber;
//   });
// })();


//--------------------------------------------------------------------------




















//--------------------------------------------------------------------------

//                       ----- Marina's 完全版 -----
//--------------------------------------------------------------------------

// const cards = document.querySelectorAll('.memory-card');
//   cards.forEach(card => {
//     card.addEventListener('click', flipCard);
//   });

// let hasFlippedCard = false; 
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//   if(lockBoard) return;               // lock board を設置処理!
//   if(this === firstCard) return;     // dblClick を防止する処理!
//   this.classList.add('js_flip');
//   if(!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;
//     return;
//   } 
//     secondCard = this;     // hasFlippedCard: false; 削除!
//     checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
//     isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);
//   resetBoard();  // resetBoard を設置!
// }

// function unflipCards() {
//   lockBoard = true;
//   setTimeout(() => {
//     firstCard.classList.remove('js_flip');
//     secondCard.classList.remove('js_flip');
//     resetBoard();  // resetBoard を設置!  lockBoard: false; 削除!
//   }, 1500);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// function shuffleCards() {
//   cards.forEach(card => {
//     const randomNumber = Math.floor(Math.random() * cards.length);
//     card.style.order = randomNumber;
//   });
// }
// shuffleCards();

//--------------------------------------------------------------------------




















































