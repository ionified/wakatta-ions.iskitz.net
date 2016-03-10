;

+
{ re:
    { id: "todos"
    , of: "わかった"
    , is: "ToDos for わかった, a Japanese language game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.23...03.10-08.00"
    , in: "san-jose.california.usa.earth"
    },

  todos:
    { ionify:
        [ "get alphabets via +kana not +game.make()"
        , "make +view, +game, + +kana.romaji own scripts"
        , "manage css animation behavior from +view"
        , "manage resources (css, audio, etc) from ions"
        ]

    , わかった:
        [ "rename kana.game folder to wakatta"
        , "swipe left slows display, right quickens it"
        , "swipe up visualizes Yes, down visualizes No"
        , "auto speed up or down per user's success speed"
        , "enable pairing hiragana, katakana, + romaji"
        , "add learn mode that only shows right answers"
        , "add romaji typing practice"
        , "add vocabulary, group by user's role(s) + interest(s)"
        , "add image: word pairing"
        , "add pronounciation audio: gendered voices"
        , "add statement confirmation"
        , "add image(s): statement pairing"
        , "add character writing practice"

        , { "proficiency progress":
              [ "per character"
              , 'per gojūon ("a,i,u,e,o") group'
              , "per alphabet"
              , "per character, group, + alphabet speed"
              , "using maturing avatar"
              ]
          }

        , { "proficiency coach":
              [ { "as success plateaus":
                   [ "increase speed"
                   , "increase complexity"
                   , "suggest other skills"
                   , "interact with others"
                   ]
                }
              , "combine letters; i.e. ひろこ : ヒロコ"
              , "improve speed via auto-scroll and fade"
              ]
          }
       ] //+.わかった
    } //+.ionify +.わかった
} //+わかった.todos

+
{ re:
    { id: "hub"
    , of: "ionify"
    , is: "An ion communication hub"
    , by: "Michael Lee, iskitz.net"
    , at: "2007.09.15-04.00...2016.03.10-08.00"
    , in: ["forest-hills.new-york.usa.earth", "san-jose.california.usa.earth"]
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

      switch (true)
        { case !!id || 'id' in this
            :  ion [id] = this
            ;  break
            ;
          case !!this.on || 'on' in this
            :  ions.on (this)
            ;  break
            ;
          case !!this.get || 'get' in this
            :  ions.get (this)
            ;  break
            ;
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
          { case Array.isArray (thing)
              :  for (var next=thing.length; next--; on (thing [next]))
              ;  return
              ;
            case typeof thing == "object"
              :  //td: {like:{blah:[],ha:true}}
              ;  return
              ;
            default
              :  //td: locate thing before trying to get it
              ;  +{get:thing}
              ;  return
          }
      }, //on()

  get:
    function get (ion)
      { var things  = ion.get
          , next    = ajile.next
          ;

        switch (true)
          { case Array.isArray (things)
              :  next.concat (things)
              ;  return
              ;
            case typeof thing == "object"
              :  //td: {get: {ion|js|:"path", async:true||false, cache:true||false}}
              ;  return
              ;
            default
              :  next.push (things)
              ;  return
          }
      }, //get()

  valueOf:
    function valueOf ()
      {  this.onIon.ions           = this
      ;  Object.prototype.valueOf  = this.onIon
      }
} //+ionify.hub

+
{ re:
    { id: "view"
    , of: "わかった"
    , is: "A web interface for, わかった, a Japanese language game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.15...03.10-08.00"
    , in: "san-jose.california.usa.earth"
    },

  title     : document.title = "わかった",
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
      +
      { re:
          { id: "view.guess",
            it:
              [ "Determines Yes, No, or Skip choice based on touch and movement input"
              , "Yes is any touch + upward movement greater than or equal to +view.swipeSize pixels"
              , "No  is any touch + upward movement less than +view.swipeSize pixels"
              , "Skip's any touch and release with movement of less than +view.swipeSize pixels"
              , "Waits for movement input to complete before continuing game play"
              , "Calculates score by sending choice to +game.score()"
              , "Displays score via +view.show()"
              ]
          }
      }; //re.view.guess()

      var view  = this
        , game  = view.ions.all['game']
        , from  = {y:null}
        , to    = {y:null}
        , guess = null
        , move
        ;

      function guessing (event)
        { event.preventDefault();

          switch (event.type)
            { case "touchstart":
              case "mousedown"
               :  move = from
               ;  break;

              case "touchmove":
              case "mousemove"
               :  if (from.y === null || guess !== null) return
               ;  move = to
               ;  break

              case "touchend":
              case "mouseout":
              case "mouseup"
               :  guess = from.x = from.y = to.x = to.y = null
               ;  game.stop ()
               ;  view.reset()
               ;  game.start()
               ;  return
            }//switch

          move.x = event.pageX;
          move.y = event.pageY;

          if (to.y === null) return;

          var change = from.y - to.y
            , answer = false
            ;

          if (Math.abs (change) >= view.swipeSize)
            {  game.stop()
            ;  guess  = change < 0
            ;  answer = guess == game.answer
            ;  answer ? view.yes() : view.no()
            ;  view.show ({score: game.score (answer)})
            }
        } //+わかった.view.guess.guessing()

      return (view.guess = guessing);
    }, //+わかった.view.guess()

  yes:
    function yes ()
      {  this.view.className = "yes"
      },

  no:
    function no ()
      {  this.view.className = "no"
      },

  reset:
    function reset ()
      {  this.view.className = ""
      },

  show:
    function show (thing)
      {  this.view.innerHTML
            = thing.score >= 0
            ? this.view.innerHTML + '<br>' + thing.score + '%'
            : thing
            ;
      }
} //+わかった.view

+
{ re:
    { id: "game"
    , of: "わかった"
    , is: "わかった, a japanese kana alphabet game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.15...03.10-08.00"
    , in: "san-jose.california.usa.earth"
    },

  on:
    ["kana", "view"],

  hiragana:
    ["あ","ん"], // uni:12450...

  katakana:
    ["ア","ン"],

  go:
    function わかった ()
      {  with (this)
           {  make ([hiragana, katakana])
           ;  this.view = ions.all.view
           ;  view.sense ()
           ;  start ()
           }
      },

  make:
    function make (alphabet) {
      if (Array.isArray (alphabet [0]))
        {  next = alphabet.length
        ;  while (next--) make (alphabet [next])
        ;  return
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
          {  play()
          ;  stop.id = setInterval (play, speed)
          }
      },

  stop:
    function stop ()
      {  clearInterval (stop.id);
      },

  answer  : false,
  answers : 0,
  ease    : 5, //1=10%,..., 5=50%,..., 10=100%
  skill   : 0,

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
      }; //re.game.play()

      var game      = this
        , view      = game.view
        , stop      = game.stop
        , hiragana  = game.hiragana
        , katakana  = game.katakana
        , letters   = hiragana.length
        , played
        ;

      function playing ()
        { var nextH       = (Math.random() * letters) | 0
            , match       = game.ease > ((Math.random() * 10 + 1) | 0)
            , nextK       = match ? nextH : (Math.random() * letters) | 0
            ; game.answer = nextH == nextK
            ; game.answers++
            ;

          view.show (hiragana [nextH] + " : " + katakana [nextK]);
          match && (played ? ++played : played = 1);
          (played >= letters) && game.stop();
        }

      (game.play = playing)();
    }, //+わかった.game.play()

  score:
    function score (answer)
      {  !score.correct && (score.correct = 0)
      ;  answer && ++score.correct
      ;  this.skill = (score.correct / this.answers) * 100 | 0
      ;  return this.skill
      }

} //+わかった.game

;