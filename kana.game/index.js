;

+
{ todos:
    [ "create a healthy mix of right and wrong answers"
    , "swipe left decreases display speed, right increases it"
    , "swipe up shows yes indicator above, down shows no indicator below"
    , "speed up or down automatically based on user's guess success speed"
    , "show maturing avatar representing proficiency"
    , "combine letters as success plateaus; i.e. ひろこ : ヒロコ and はい : ハイ"
    , "make a vocabulary game"
    , "make a statement confirmation game"
    ]
}//+todos

+
{ re:
    { id: "scope"
    , is: "A shared scope for, 日本のかなぐえむ, a Japanese kana alphabet game's ions"
    , by: "Michael Lee, iskitz.net"
    , at: "2016.01.23..24-08.00"
    , in: "san-jose.ca.usa.earth"
    },

  all:
    {},

  on:
    function on () {
      var id  = this.id || (this.re && this.re.id)
        , get = on.get.all
        ;

      switch (true) {
        case !!id || 'id' in this:
          get [id] = this;
          break;

        default:
          for (var thing in this) {
            get [thing] = this [thing];
          }
      }

      !(this.get || 'get' in this) && (this.get = get);
      typeof this.go == "function" && this.go();
    },

  valueOf:
    function valueOf () {
      this.on.get = this;
      Object.prototype.valueOf = this.on;
    }
}//+scope

+
{ re:
    { id: "view"
    , is: "A web interface for, 日本のかなぐえむ, a Japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net"
    , at: "2016.01.15..24-08.00"
    , in: "san-jose.ca.usa.earth"
    },

  title     : document.title = "日本のかなぐえむ",
  view      : document.body,
  swipeSize : 10,

  sense:
    function sense () {
      var guess = this.guess()
        , view  = this.view
        ;

      view.addEventListener ("touchstart" , guess , false);
      view.addEventListener ("touchmove"  , guess , false);
      view.addEventListener ("touchend"   , guess , false);

      view.addEventListener ("mousedown", guess , false);
      view.addEventListener ("mousemove", guess , false);
      view.addEventListener ("mouseout" , guess , false);
      view.addEventListener ("mouseup"  , guess , false);
    },

  guess:
    function guess () {
      var view  = this
        , game  = view.get['game']
        , from  = {y:null}
        , to    = {y:null}
        , guess = null
        , move
        ;

      function guessing (event) {
        event.preventDefault();

        switch (event.type) {
          case "touchstart":
          case "mousedown":
            move = from;
            break;

          case "touchmove":
          case "mousemove":
            if (from.y === null || guess !== null) return;
            move = to;
            break;

          case "touchend":
          case "mouseout":
          case "mouseup":
            guess = from.x = from.y = to.x = to.y = null;
            game.stop ()
            view.maybe();
            game.start();
            return;
        }//switch

        move.x = event.pageX;
        move.y = event.pageY;

        if (to.y === null) return;

        var change = from.y - to.y;

        if (Math.abs (change) >= view.swipeSize) {
          game.stop();
          guess = change < 0;
          guess == game.answer ? view.yes() : view.no();
        }
      }//guessing()

      return (view.guess = guessing);
    },

  yes:
    function yes () {
      this.view.className = "yes";
    },

  no:
    function no () {
      this.view.className = "no";
    },

  maybe:
    function maybe () {
      this.view.className = "";
    },

  show:
    function show (thing) {
      this.view.innerHTML = thing;
    }

}//+view

+
{ re:
    { id: "game"
    , is: "日本のかなぐえむ, a japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net"
    , at: "2016.01.15..24-08.00"
    , in: "san-jose.ca.usa.earth"
    },

  on: {view:'view'},           //idea: get 'view' then store in this ion as 'view'

  hiragana:
    ["あ","ん"], // uni:12450...

  katakana:
    ["ア","ン"],

  go:
    function 日本のかなぐえむ () {
      with (this) {
        make ([hiragana, katakana]);
        this.view = get.view;
        view.sense ();
        start ();
      }
    },

  make:
    function make (alphabet) {
      if (Array.isArray (alphabet [0])) {
        next = alphabet.length;
        while (next--) make (alphabet [next]);
        return;
      }

      var character = String.fromCharCode
        , first     = alphabet [0].charCodeAt (0)
        , last      = alphabet [1].charCodeAt (0)
        , code      = last + 1
        , next      = code - first + 1
        ;

      while (next-- && code--)
       alphabet [next] = character (code);
    },

  speed: 2500||"ms",

  start:
    function start () {
      with (this) {
        play();
        stop.id = setInterval (play, speed);
      }
    },

  stop:
    function stop () {
      clearInterval (stop.id);
    },

  answer: false,

  play:
    function play() {
      var game      = this
        , view      = game.view
        , stop      = game.stop
        , hiragana  = game.hiragana
        , katakana  = game.katakana
        , rounds    = hiragana.length
        , played
        ;

      function playing () {
        var hGuess = (Math.random() * rounds) | 0
          , kGuess = (Math.random() * rounds) | 0
          ;

        game.answer = hGuess == kGuess;
        view.show (hiragana [hGuess] + " : " + katakana [kGuess]);

        played ? ++played : (played = 1);
        (played == rounds) && stop();
      }

      (game.play = playing)();
    }

}//+game

;