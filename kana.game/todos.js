;

+
{ re:
    { id: "todos"
    , of: "わかった"
    , is: "ToDos for わかった, a Japanese language game"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , at: "2016.01.23...03.11-08.00"
    , in: "san-jose.california.usa.earth"
    },

  todos:
    [ "rename kana.game folder to wakatta"
    , "get alphabets via +kana not +game.make()"
    , "make +view, +game, + +kana.romaji own scripts"
    , "manage css behavior from +view"
    , "swipe up visualizes Yes, down visualizes No"
    , "enable pairing hiragana, katakana, + romaji"
    , "add learn mode that only shows right answers"
    , "swipe left slows display, right quickens it"
    , "auto speed up or down per user's success speed"
    , "manage resources (css, audio, storage, etc) from ions"

    , { "save skill progress":
          [ "temporarily using SessionStorage or Cookies"
          , "persistently using LocalStorage, IndexedDB, "
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
   ] //+.todos
} //+わかった.todos

;