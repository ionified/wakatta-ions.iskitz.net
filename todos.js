;

+
{ re:
    { id: "todos"
    , of: "わかった"
    , is: "ToDos for わかった, a Japanese language game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.11.12-08...01.23-07"
    , in: "san-jose.california.usa.earth"
    },

  todos:
    [ "simplify yes + no interaction"
    , "enable pairing hiragana, katakana, + romaji"
    , "add learn mode that only shows right answers"
    , "auto speed up or down per user's success speed"
    , "manage resources (css, audio, storage, etc) from ions"

    , { "save skill progress":
          [ "temporarily using SessionStorage or Cookies"
          , "persistently using LocalStorage, IndexedDB, or Server"
          , "user id + authentication can be a specific gesture over some period of time"
          ]
      }

    , "add romaji typing practice"
    , "add vocabulary, group by user's role(s) + interest(s)"
    , "add image: word pairing"
    , "add pronounciation audio: gendered voices"
    , "add statement confirmation"
    , "add image(s): statement pairing"

    , { perf:
          [ "test after each feature change"
          , "use http://webpagetest.org/"

          , { "http://tinyurl.com/wakatta-2016-03-10 http://tinyurl.com/wakatta-2016-03-10-noanimation":
                [ "1000 ms between 1st request + 1st render + animation ? css animation, js execution"
                , " 750 ms between 1st request + 1st render - animation ? looks like favicon"
                , " 536 ms idle time                                    ? why no activity"
                , " 706 ms between 1st render  + favicon available      ? why no main thread activity"
                , " 590 ms between 1st request + favicon requested      ? store as data-url to minimize"
                ]
            }
          ]
      }

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

    , { "add character writing practice":
          [ "look for existing web solutions"
          , "? use character svgs and canvas input"
          ]
      }

    , { "add speech practice":
          [ "look for existing web solutions"
          , "? use webrtc/microphone api and audio analysis"
          ]
      }
    ], //+.todos

  done:
    [ "rename kana.game folder to wakatta"
    , "Swipe left slows display, right quickens it"
    , "Manages css behavior from +view"
    , "Made +view, +game, + +kana.romaji own scripts"
    , "Gets alphabets via +kana not +game.make()"
    , "Moved todos to +todos + added initial +ionify.get + renamed +kana..core to +kana.gojuon"
    , "Renamed in code as わかった, Wakatta, I got it + Added, grouped, and prioritized todos + Renamed +ions to +ionify.hub + Added sokuon kana."
    , "Added re.view.guess() + preempted potential scoring bug in +view.guess() + tidied code."
    , "Yes & No input changes character colors instead of entire background, animation pauses during input, 1st answer wrong display bug fixed, + +game.play() scope loss preempted."
    , "Added fade animation + score display."
    , "Refined algorithm for matching letter pairs, added re.game.play()"
    , "Better mix of right & wrong answers, slower game speed, + beginning support for external scripts."
    , "Made dakuten, handakuten, and yōon characters named member sets of the hiragana, katana, and romaji character sets."
    + " Did this to make code using these character sets easier to understand."
    + " Previously, the dakuten, handakuten, and yōon character sets would need"
    + " to be accessed via index offsets of the single hiragana, katakana, and"
    + " romaji array lists."
    , "Added hiragana and katana yōon; e.g. ja:じゃ + adjusted visual alignment of all 3 character sets."
    , "Added romaji dakuten + handakuten + todos for yōon + child fields + Updated re.by, re.at and re.in formats and content."
    , "Added accented kana characters like be:べ and pe:ぺ"
    , "Made kana.js to map Japanese Kana to each other and romaji."
    , "Render brush-like Japanese characters on iOS + OS X, and set app's name via meta tags."
    , "Renamed game + added fullscreen support for add-to-homescreen on mobile"
    , "Enabled touch support for mobile"
    ]
} //+わかった.todos

;