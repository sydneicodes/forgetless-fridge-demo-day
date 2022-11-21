$(document).ready(function () {
    var zindex = 10;
  
    $("div.card").click(function (e) {
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("d-card-show")) {
        isShowing = true;
      }
  
      if ($("div.dashboard-cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.d-card-show").removeClass("d-card-show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.dashboard-cards").removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this).css({ zIndex: zindex }).addClass("d-card-show");
        }
  
        zindex++;
      } else {
        // no dashboard-cards in view
        $("div.dashboard-cards").addClass("showing");
        $(this).css({ zIndex: zindex }).addClass("d-card-show");
  
        zindex++;
      }
    });
  });
  