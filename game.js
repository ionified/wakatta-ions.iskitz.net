;
~
{ re:
    { id:  'wakatta.game@ions.iskitz.net'
    , is:  "わかった, a japanese language skills game"
    , do: {kana:true, view:true}
    , by: ['🙇🏾‍♂️ יהוה 🤲🏾', 'mike🇬🇾👨🏾‍💻🇺🇸lee']
    , in:  'san-jose.california.usa.earth'
    , on:  {201609026.2 : -7}
    , to:  {578310044.1 : -8}
    , at:  -5.000
    , go:
        { meet: 'https://meet.ionify.net/'
        , seek: 'https://seek.ionify.net/'
        , deal: 'https://deal.ionify.net/'
        , play: 'https://ionified.github.io/wakatta-ions.iskitz.net/'
        , help: 'https://github.com/ionified/wakatta-ions.iskitz.net/issues'
      //, test: 'https://github.com/ionified/wakatta-ions.iskitz.net/blob/public/game.test.js'
        , code: 'https://github.com/ionified/wakatta-ions.iskitz.net/blob/public/game.js'
        },
      we:
        [ "WERE for Kaito: switching to hiragana, & slowing to sound-out romaji"
        , "were implementing kana & skill switching()"
        , "must ..."
        , "will ..."
        , "like ..."
        , "wont ..."
        ]
    },

  do:
    [  "ingest the kana syllabary"
    , "connect the game's view"
    ,   "start the game"
    ],

 "start the game":function
  go( )
    { var game  = go.with.my
    ; game.stop & game.start
    },

 "ingest the kana syllabary":function
  kana
    ( )
    { var via       = kana.with
        , syllabary = via.the.language.syllabary.kana
        , game      = via.my
        , alpha
        , next
        , name

      for
        ( var set in syllabary )
        { if (set == "re" || set == "kana") continue
          next  = syllabary [set]
          alpha = []

          for
            ( var subset in next)
            { subset = next [name = subset]
            ; if (!Array.isArray (subset)) continue
            ; alpha.push.apply (alpha, subset)
            ; alpha [name] = subset
            }

          game [set] = alpha
        }
    },

 "connect the game's view":function
  theView
    ( )
    { var via  = theView.with
        , view = via.our.wakatta.view
        , show = view.show
        , type = typeof show
        , game = via.my

      type != "function" && +{error: ["game needs show to be a function but it's a ", type]}
      game.show = show    ; +/todo: +use or +get? would auto-add view's .show() to +game/
      view.game = game
    },

  speed: 10000||"ms"
    ,

  start:function
  start ()
    { var game = start.with.its

      with (game)
        {  play()
        ;  stop.id = setInterval (play, speed)
        }
    },

  stop:function
  stop ()
    { clearInterval (stop.id)
    }

, answer  : false
, answers : 0
, ease    : 5, //1=10%,..., 5=50%,..., 10=100%

  play:function
  play()
    { ~
      { re:
          { id: "wakatta.game.play@ions.iskitz.net"
          , it:
              [ "decides which pairs of letters to show using randomness"
              , "decides which pairs should match using the +game.ease randomness threshold"
              , "sends letter pairs to the view for display"
              , "stops the game after showing as many matches as there are letters"
              ]
          }
      }

      var game    = play.with.its
        , show    = game.show
        , stop    = game.stop
        , left    = game.romaji.gojuon
        , right   = game.hiragana.gojuon
        , letters = left.length
        , played

      function playing ()
        { var nextL       = (Math.random() * letters) | 0
            , match       = game.ease > ((Math.random() * 10 + 1) | 0)
            , nextR       = match ? nextL : (Math.random() * letters) | 0
            ; game.answer = nextL == nextR
            ; game.answers++

        ; match && (played ? ++played : played = 1)
        ; (played >= letters) && stop()
        ; show (left [nextL] + " : " + right [nextR])
        }

      (game.play = playing)()
    },

  switch:function
  switching ()
    { var game  = switching.with.its
        , kana  = game.kana
        , left  = kana.left  || (kana.left  = game.romaji  .gojuon)
        , right = kana.right || (kana.right = game.hiragana.gojuon)
    },

  skill: 0,

  score:function
  score (answer)
    {  var game = score.with.its
    ;  !score.correct && (score.correct = 0)
    ;  answer && ++score.correct
    ;  game.skill = Math.round ((score.correct / game.answers) * 100)
    ;  return game.skill
    }
}
;