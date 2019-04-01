;
~
{ re:
    { id: "wakatta.game@ions.iskitz.net"
    , by: 'mike.lee'
    , on: -7.20160902
    , to: -7.20190330
    , at: 'ions.iskitz.net'
    , in: 'san-jose.california.usa.earth'
    , is: +2.1
    , it: "implements わかった, a japanese language game"
    }

, on:
    ['kana', 'show'] //can:"show"

, get
:   ['kana', 'view']

, ready
:   function ready (state)
      { var     game  = ready.home
      ; ready [state] = true
      ; ready.kana && ready.view && game.stop & game.start
      }

, kana
:   function onKana (kana)
      { var game = onKana.home
          , alpha
          , next
          , name

      ~ {on:"kana", no:game}

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
        game.ready ("kana")
      }

, show
:   function onShow (view)
      {   var game = onShow.home
            , show = view.show
            , type = typeof show

      ;   type != "function" && ~{error: "game needs show to be a function but it's a " + type}
      ~   {on:"show", no:game}
      ;   game.show = show    ; ~/todo: +use or +get? would auto-add view's .show() to +game/
      ;   view.game = game
      ;   game.ready ("view")
      }

, speed: 5000||"ms"

, start
:   function start ()
      { var game = start.home

        with (game)
          {  play()
          ;  stop.id = setInterval (play, speed)
          }
      }

, stop
:   function stop ()
      {  clearInterval (stop.id)
      }

, answer  : false
, answers : 0
, ease    : 5 //1=10%,..., 5=50%,..., 10=100%

, play
:   function play()
      { ~
        { re:
            { id: "wakatta.game.play@ions.iskitz.net"
            , it:
                [ "Decides which pairs of letters to show using randomness"
                , "Decides which pairs should match using the +game.ease randomness threshold"
                , "Sends letter pairs to the view for display"
                , "Stops the game after showing as many matches as there are letters"
                ]
            }
        }

        var game      = play.home
          , show      = game.show
          , stop      = game.stop
          , hiragana  = game.romaji.gojuon
          , katakana  = game.katakana.gojuon
          , letters   = hiragana.length
          , played

        function playing ()
          { var nextH       = (Math.random() * letters) | 0
              , match       = game.ease > ((Math.random() * 10 + 1) | 0)
              , nextK       = match ? nextH : (Math.random() * letters) | 0
              ; game.answer = nextH == nextK
              ; game.answers++

          ; match && (played ? ++played : played = 1)
          ; (played >= letters) && stop()
          ; show (hiragana [nextH] + " : " + katakana [nextK])
          }

        (game.play = playing)()
      }
      
, skill: 0

, score
:   function score (answer)
      {  var game = score.home
      ;  !score.correct && (score.correct = 0)
      ;  answer && ++score.correct
      ;  game.skill = Math.round ((score.correct / game.answers) * 100)
      ;  return game.skill
      }
}
;