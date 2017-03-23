;

~
{ re:
    { id: "wakatta.game@ions.iskitz.net.0.1.1"
    , is: "わかった, a japanese kana alphabet game"
    , by: "mike.lee@iskitz"
    , at: "2017.03.23-07...2016.09.02-07"
    , in: "san-jose.california.usa.earth"
    },

  get:
    ["kana", "view"],

  on:
    ["kana", "show"],  //can:"show"


  kana:
    function onKana (kana)
      { var game = onKana.this
          , alpha
          , next
          , name
          ;

        for (var set in kana)
          {   if (set == "re" || set == "kana") continue
          ;   next  = kana [set]
          ;   alpha = []

              for (var subset in next)
                {  subset = next [name = subset]
                ;  if (!Array.isArray (subset)) continue
                ;  alpha.push.apply (alpha, subset)
                ;  alpha [name] = subset
                }

              game [set] = alpha
          }

        ~{game:game} + /todo: +view.on: {id:"game"} +game.kana: +this /
      },


  show:
    function onShow (viewORdata)
      {   if (!viewORdata) return

          var game  = onShow    .ion
            , show  = viewORdata.show
            ;

          switch (true)
            { case "function" == typeof viewORdata.show
                :   game.show = viewORdata.show             ;~/todo: ionify: get sets automatically      /
                ~  {no:"show", for:game}                     +/note: ignore future "show" notifications  /
                ~   game.stop + game.start
                ;   break

              default
                :  +{log:viewORdata}
                ;   break
            }
      },


  speed: 5000||"ms",

  start:
    function start ()
      { with (start.this)
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


      var game      = play.this
        , show      = game.show
        , stop      = game.stop
        , hiragana  = game.romaji.gojuon
        , katakana  = game.katakana.gojuon
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

          show (hiragana [nextH] + " : " + katakana [nextK]);
          match && (played ? ++played : played = 1);
          (played >= letters) && stop();
        }

      (game.play = playing)();
    }, //+わかった.game.play()


  skill: 0,

  score:
    function score (answer)
      {  var game = score.this
      ;  !score.correct && (score.correct = 0)
      ;  answer && ++score.correct
      ;  game.skill = Math.round ((score.correct / this.answers) * 100)
      ;  return game.skill
      }

} //+わかった.game

;