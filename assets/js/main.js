$(window).load(function() {
  $(".imgOne").fadeOut()
  $(".imgOne").delay(500)
  $(".imgOne").fadeIn()
});

$(document).ready(function() {
  $('.search').click(function() {
    var pokeapi = 'https://pokeapi.co/api/v2/pokemon/';
    var pokemon = $('#name').val(); //RETURNS VALUE INPUTFIELD
    var url = pokeapi + pokemon + '/'; //RETURNS SEARCHED POKEMON
    var pokeapi2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    var url2 = pokeapi2 + pokemon + '/'; //RETURNS SEARCHED POKEMON BY SPECIES

    var pokeprev;
    var pokeprevurl;

    console.log(url);

    $.ajax({
      url: url,
      success: function(x) {
        $.ajax({
          url: url2,
          success: function(y) {
            
            //CHECKS PREVIOUS EVOLUTION AND ADDS / REMOVES SPRITE
            if (y.evolves_from_species != null) {
              pokeprev = x.id - 1;
              pokeprevurl = pokeapi + pokeprev + '/';
              $.ajax({
                url: pokeprevurl,
                success: function(z) {
                  $('.imgFive').attr('src', z.sprites.front_default);
                }
              });
            } else {
              $('.imgFive').attr('src', '');
            }

            //CHECKS PREVIOUS EVOLUTION AND ADDS / REMOVES NAME
            if (y.evolves_from_species != null) {
              $('.six').text('Previous evolution: ' + y.evolves_from_species.name);
            } else {
              $('.six').text('No previous evolution ');
            }

            //RETURNS FLAVOUR TEXT
            $('.seven').text('Flavor text: ' + y.flavor_text_entries[1].flavor_text);
          }
        });

        //RETURNS NAME
        $('h3').text('Name: ' + x.name);
        //RETURNS ID
        $('.one').text('ID: ' + x.id);

        //CHECKS IF POKEMON HAS ONLY 1 MOVE
        if (x.moves.length == 1) {
          $('.two').text('Move 1: ' + x.moves[0].move.name);
          $('.three').text('Move 2: ' + 'No move');
          $('.four').text('Move 3: ' + 'No move');
          $('.five').text('Move 4: ' + 'No move');
        } else {
          $('.two').text('Move 1: ' + x.moves[0].move.name);
          $('.three').text('Move 2: ' + x.moves[1].move.name);
          $('.four').text('Move 3: ' + x.moves[2].move.name);
          $('.five').text('Move 4: ' + x.moves[3].move.name);
        }


        $('.eight').text(x.height);
        $('.nine').text(x.weight);

        $('.imgOne').attr('src', x.sprites.front_default);
        $('.imgTwo').attr('src', x.sprites.back_default);
        $('.imgThree').attr('src', x.sprites.front_shiny);
        $('.imgFour').attr('src', x.sprites.back_shiny);
      }
    });
  });
});
