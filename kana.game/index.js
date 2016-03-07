;

+
{ todos:
    [ "move +view and +game ions to their own scripts"
    , "load alphabets via the +kana ion instead of generating them via +game.make()"
    , "add a learn mode that only shows right answers"
    , "add romaji"
    , "enable creating hiragana, katakana, and romaji pairs"
    , "swipe left decreases display speed, right increases it"
    , "swipe up shows yes indicator above, down shows no indicator below"
    , "speed up or down automatically based on user's guess success speed"
    , "show maturing avatar representing proficiency"
    , "combine letters as success plateaus; i.e.:"
    , "   ひろこ : ヒロコ and はい : ハイ"
    , "make a vocabulary game"
    , "   enable word : image pairs"
    , "make a statement confirmation game"
    ]
}//+todos

+
{ re:
    { id: "ions"
    , of: "かなゲーム"
    , is: "An ion communication hub within, かなゲーム, a Japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net"
    , at: "2016.01.23...03.06-08.00"
    , in: "san-jose.california.usa.earth"
    },

  all:
    { ajile: {next: []}
    },

  onIon:
    function onIon () {
      var id    = this.id || (this.re && this.re.id)
        , ions  = onIon.ions
        , ion   = ions.all
        ;

      switch (true) {
        case !!id || 'id' in this:
          ion [id] = this;
          break;

        case !!this.on || 'on' in this:
          ions.on (this);
          break;

        case !!this.get || 'get' in this:
          ions.get (this);
          break;

        default:
          for (var thing in this) {
            ion [thing] = this [thing];
          }
      }

      !(this.ions || 'ions' in this) && (this.ions = ions);
      typeof this.go == "function" && this.go();
    },

  on:
    function on (ion)
      { var thing = ion.on;

        switch (true)
          { case Array.isArray (thing):
              for (var next=thing.length; next--; on (thing [next]));
              return;

            case typeof thing == "object":
              //td: {like:{blah:[],ha:true}}
              return;

            default:
              //td: locate thing before trying to get it
              +{get:thing};
              return;
          } //switch
      }, //on()

  get:
    function get (ion)
      { var things  = ion.get
          , next    = ajile.next
          ;

        switch (true)
          { case Array.isArray (things):
              next.concat (things);
              return;

            case typeof thing == "object":
              //td: {get: {ion|js|:"path", async:true||false, cache:true||false}}
              return;

            default:
              next.push (things);
              return;
          } //switch
      },

  valueOf:
    function valueOf ()
      {   this.onIon.ions           = this
      ;   Object.prototype.valueOf  = this.onIon
      }
} //+ions

+
{ re:
    { id: "view"
    , of: "かなゲーム"
    , is: "A web interface for, かなゲーム, a Japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.15...03.06-08.00"
    , in: "san-jose.california.usa.earth"
    },

  title     : document.title = "かなゲーム",
  view      : document.body,
  swipeSize : 10,

  sense:
    function sense () {
      var guess = this.guess()
        , view  = this.view
        ;

      view.addEventListener ("touchstart" , guess, false);
      view.addEventListener ("touchmove"  , guess, false);
      view.addEventListener ("touchend"   , guess, false);

      view.addEventListener ("mousedown"  , guess, false);
      view.addEventListener ("mousemove"  , guess, false);
      view.addEventListener ("mouseout"   , guess, false);
      view.addEventListener ("mouseup"    , guess, false);
    },

  guess:
    function guess () {
      var view  = this
        , game  = view.ions.all['game']
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
            view.reset();
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

  reset:
    function reset () {
      this.view.className = "";
    },

  show:
    function show (thing) {
      this.view.innerHTML = thing;
    }

} //+view

+
{ re:
    { id: "game"
    , of: "かなゲーム"
    , is: "かなゲーム, a japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.15...03.06-08.00"
    , in: "san-jose.california.usa.earth"
    },

  on:
    ["kana", "view"],

  hiragana:
    ["あ","ん"], // uni:12450...

  katakana:
    ["ア","ン"],

  go:
    function かなゲーム ()
      { with (this)
          { make ([hiragana, katakana])
          ; this.view = ions.all.view
          ; view.sense ()
          ; start ()
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

  speed: 5000||"ms",

  start:
    function start ()
      { with (this)
          { play()
          ; stop.id = setInterval (play, speed)
          }
      },

  stop:
    function stop ()
      { clearInterval (stop.id);
      },

  answer: false,
  ease  : 5, //50% easy: 1=10%, 2, 3, 4, 5=50%, 6, 7, 8, 9, 10=100%

  play:
    function play() {
      +
      { re:
          { id: "game.play",
            it:
              [ "Decides which pairs of letters to show using randomness"
              , "Decides which pairs should match using the +game.ease randomness threshold"
              , "Sends letter pairs to the view for display"
              , "Stops the game after showing as many matches as there are letters"
              ]
          }
      };

      var game      = this
        , view      = game.view
        , stop      = game.stop
        , hiragana  = game.hiragana
        , katakana  = game.katakana
        , letters   = hiragana.length
        , played
        ;

      function playing ()
        { var nextH = (Math.random() * letters) | 0
            , match = game.ease > ((Math.random() * 10 + 1) | 0)
            , nextK = match ? nextH : (Math.random() * letters) | 0
            ;

          game.answer = nextH == nextK;
          view.show (hiragana [nextH] + " : " + katakana [nextK]);

          match && (played ? ++played : played = 1);
          (played >= letters) && stop();
        }

      (game.play = playing)();
    } //play()

} //+game

;