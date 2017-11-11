;
~
{ re:
    { id: "wakatta.view.0.1@ions.iskitz.net"
    , is: "A web interface for, わかった, a japanese language game"
    , by: "mike.lee@iskitz"
    , at: "2017.11.11-08...2016.09.04-07"
    , in: "san-jose.california.usa.earth"
    }

, do    : "sense"
, dom   : this && this.document &&  this.document.body
, title : this && this.document && (this.document.title = "わかった")
,

  errors:
    { noDOM: "Wakatta uses the DOM:'Document Object Module' for display + interaction but found none."
    }
    ,

  sense:
    function sense ()
      { var view  = sense.ion
          , move  = view.move()
          , dom   = view.dom

      ! dom && +{error: view.errors.noDOM}

      ; dom.addEventListener ("touchstart" , move, false)
      ; dom.addEventListener ("touchmove"  , move, false)
      ; dom.addEventListener ("touchend"   , move, false)

      ; dom.addEventListener ("mousedown"  , move, false)
      ; dom.addEventListener ("mousemove"  , move, false)
      ; dom.addEventListener ("mouseout"   , move, false)
      ; dom.addEventListener ("mouseup"    , move, false)
      }
      ,

  move:
    function move () {
      ~
      { re:
          { id: "wakatta.view.move",
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
      }

      var view  = move.ion
        , game  = view.game
        , guess = null
        , from  = {y:null}
        , to    = {y:null}
        , moved

      function moving (event)
        { event.preventDefault()

          switch (event.type)
            { case "touchstart":
              case "mousedown"
               :  moved = from
               ;  break

              case "touchmove":
              case "mousemove"
               :  if (from.y === null || guess !== null) return
               ;  moved = to
               ;  break

              case "touchend":
              case "mouseout":
              case "mouseup"
               :  guess = from.x = from.y = to.x = to.y = null
               ;  view.game.stop & view.reset & view.game.start
               ;  return
            }

        ; moved.x = event.pageX
        ; moved.y = event.pageY
        ; if (to.y === null) return
        ; moved.x = from.x - to.x
        ; moved.y = from.y - to.y
        ; guess   = view.guess (moved)
        }

      return (view.move = moving)
    }
    ,

  guess:
    function guess (move)
      { var view      = guess.ion
          , game      = view.game
          , answer    = false
          , guessed   = null
          , swipeSize = 10

        if (Math.abs (move.y) >= swipeSize)
          {  game.stop()
          ;  guessed  = move.y < 0
          ;  answer = guessed == game.answer
          ;  answer ? +view.yes : +view.no
          ;  view.show ({score: game.score (answer)})
          }

        if (answer && (Math.abs (move.x) >= swipeSize))
          {  game.speed += move.x * swipeSize
          ;  view.dom.style.animationDuration = (game.speed / 2000) + 's'
          }

        return guessed
      }
      ,

  yes:
    function yes ()
      {  yes.ion.dom.className = "yes"
      }
      ,
  no:
    function no ()
      {  no.ion.dom.className = "no"
      }
      ,
  reset:
    function reset ()
      {  reset.ion.dom.className = "fade"
      }
      ,

  show:
    function show (thing)
      { var dom = show.ion.dom

        dom.innerHTML
            = thing.score >= 0
            ? dom.innerHTML + '<br>' + thing.score + '%'
            : thing

      ! show.ing && (show.ing = true) && show.ion.reset()
      }
} //+wakatta.view
;