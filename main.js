/*
GroundhogDayClock
A pomodoro clock inspired in the film
- - - - - - - - - -
http://codepen.io/DizNicolasAmor/pen/mRaqEz
Author:  Diz, Nicolás Amor (https://github.com/DizNicolasAmor)
This project is a challenge posed by FreeCodeCamp.
*/


$(document).ready(function(){
  
  var countWork = parseInt($('#workMinutes').html());
  var countBreak = parseInt($('#breakMinutes').html());

  //if you are not in a break, you are in a work session
  var modeBreak = false;
  
  $('#clock').html('06 : 00 : 00');
  
  //settings
  $('#workMinus').click(function(){
    if(countWork > 1){
      countWork -= 1;
      $('#workMinutes').html(countWork);
    }
  });
  
  $('#workPlus').click(function(){
    if(countWork < 60){
      countWork += 1;
      $('#workMinutes').html(countWork);
    }
  });
  
  $('#breakMinus').click(function(){
    if(countBreak > 1){
      countBreak -= 1;
      $('#breakMinutes').html(countBreak);
    }
  });
  
  $('#breakPlus').click(function(){
    if(countBreak < 60){
      countBreak += 1;
      $('#breakMinutes').html(countBreak);
    }
  });
  
  
  //clock
  //remember that the Groundhog Day starts at 6:00
  var GDtime = 6*60*60; 
  var time = GDtime - countWork*60; 
  var running = 0;
  
  //main function
  function increment(){
    if(running ==1){
      setTimeout(function(){
        time++;
        
        var hours = Math.floor(time/60/60);
        var mins = Math.floor(time/60);
        var segs =  Math.floor(time);
        
        while(mins>= 60){
          mins -= 60;
        }

        while(segs>= 60){
          segs -= 60;
        }
        
        if(mins<10){mins = '0'+mins;}
        if(segs<10){segs = '0'+segs;}
        
        $('#clock').html(hours+' : '+mins+' : '+segs);
        

        //session time
        if(time<GDtime){
          $('#breakMsg').html('WORK TIME');
        }
        
        //breaktime
        if(time>=GDtime){
          $('#breakMsg').html('BREAK TIME!');
          //-->play song
        }
        
        //when breakTime finishes
        if(time==GDtime+ (countBreak*60)){
          //reset the clock
          time = GDtime - countWork*60;
          running = 0; 
          $('#clock').html('06 : 00 : 00');
          $('#breakMsg').html('Shall we start? ');
        }
        

        increment();
      }, 1000);
    }
  }
  
  //last buttons
  $("#start").click(function (){
    time = GDtime - countWork*60; 
    
    if(running==0){
      running=1;
      $("#pause").html('PAUSE');

    }
    increment();
  });
  
  $("#pause").click(function (){
    if(running==1){
       running =0;
      $("#pause").html('PLAY');
    }else if(running==0){
      running=1;
      $("#pause").html('PAUSE');
    }
    increment();
  });
  
  $('#reset').click(function(){
    time = GDtime - countWork*60;
    running = 0; 
    $('#clock').html('06 : 00 : 00');
    $("#pause").html('PLAY');
  });

  
});  //document ready;
