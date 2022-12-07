var isPlaying = false;

/*var sounds = ["https://funincluded.fr/static/contrabass.mp3",
             "https://funincluded.fr/static/pompe.mp3",
             "https://funincluded.fr/static/lead.mp3",
             "https://funincluded.fr/static/rythm1.mp3",
             "https://funincluded.fr/static/rythm_bruits.mp3"];*/
var sounds = ["https://funincluded.fr/static/Testmultitrack-1.mp3",
             "https://funincluded.fr/static/Testmultitrack-2.mp3",
             "https://funincluded.fr/static/Testmultitrack-3.mp3",
             "https://funincluded.fr/static/Testmultitrack-4.mp3",
             "https://funincluded.fr/static/Testmultitrack-0.mp3",
             "https://funincluded.fr/static/Testmultitrack-6.mp3",
             "https://funincluded.fr/static/Testmultitrack-0.mp3",
             "https://funincluded.fr/static/Testmultitrack-0.mp3",
             "https://funincluded.fr/static/Testmultitrack-0.mp3",
             "https://funincluded.fr/static/Testmultitrack-0.mp3",
             "https://funincluded.fr/static/Testmultitrack-11.mp3"];

var mouthes = ["1... .... 1... .... 1... ..1. 1... .... 1... .... 1... .... 1... .... 1.1. ....",
               ".... 1... .... 1... .... 1... .... 1... .... 1... .... 1... .... 1... .... 1...",
               "1.1. .... ..1. 1.11 1.1. .... .... ..1. 1.1. .... ..1. 1.11 1.1. .... .... ....",
               "1.1. .... ..1. 1.11 1.1. .... .... 111. 1.1. .... ..1. 1.11 1.1. .... .... ....",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ....",
               "1.11 .11. .... .... 1.11 .11. .... .... 1.11 .11. .... .... 1111 1111 1111 11..",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ....",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ....",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ....",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ....",
               ".... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ...."];

var tracks = [];
var letters = [];
var lettersMouth = [];

let debut, tempsPrecedent;
let beatCount = 0;
let fini = false;

let beatsPerSec = 78 / 60;
let beatDivider = 4;
let millisecondsPerBeat = 1000 / (beatsPerSec * beatDivider);

$("svg #funincluded > g").forEach((item, index) => {
  letters[$(item).data("index")] = item;
  lettersMouth[$(item).data("index")] = $(item).find(".mouth")[0];
});

mouthes.forEach((mouthScheme, index) => {
  mouthes[index] = mouthScheme.replace(/\s/g,'');
})

sounds.forEach((soundPath, index) => {
  var audioTrack = new Audio(soundPath);
  audioTrack.loop = true;
  audioTrack.volume = 0;
  tracks[index] = audioTrack;
});

$("svg #funincluded > g").on("click", (event) => {
  //alert(event.currentTarget.id);
  $(event.currentTarget).toggleClass("letter-active");
  if($(event.currentTarget).data("index") == "10"){
    $(".zzz").toggleClass("active");
  }
  if($(event.currentTarget).hasClass("letter-active")){
    unmuteTrack($(event.currentTarget).data("index"));
  }
  else{
    muteTrack($(event.currentTarget).data("index"));
  }
  if (!isPlaying) {
    playAll();
    setInterval(iteration, millisecondsPerBeat);
  }
  
});

function playAll(allAll = false){
  tracks.forEach((audioTrack, index) => {
    if(allAll){
      unmuteTrack(index);
    }
    audioTrack.play();
  });
  
  isPlaying = true;
}

function muteTrack(index){
  tracks[index].volume = 0;
}

function unmuteTrack(index){
  tracks[index].volume = 1;
}




console.log("millisecondsPerBeat",millisecondsPerBeat);

function iteration() {
  
  if(isPlaying){
    console.log("TOTO",tracks[0].currentTime*1000,millisecondsPerBeat)
     if(tracks[0].currentTime*1000 < millisecondsPerBeat){
       beatCount = 0;
     }
    
      if(beatCount % 4 == 0){
        $(".tempo").addClass("show");
      }
      else{
        $(".tempo").removeClass("show");
      }
      let debugStr = ""
      mouthes.forEach((mouthScheme, index) => {
        console.log(mouthScheme[beatCount]);
        if(mouthScheme[beatCount] == "1" && $(letters[index]).hasClass("letter-active")){
          $(lettersMouth[index]).addClass("active");
        }
        else{
          $(lettersMouth[index]).removeClass("active");
        }
        debugStr += ""+mouthScheme[beatCount];
      });
      $(".mouthes").html(debugStr);
      //console.log(debugStr);
      beatCount++;
      //console.log('chrono',chrono,millisecondsPerBeat,tracks[0].currentTime);
  }
  //window.requestAnimationFrame(iteration);
}

//window.requestAnimationFrame(iteration);

/*
https://drive.google.com/file/d/1yiggxrCEbuNUyv1BWY34LRal-W3hKEbm/view?usp=sharing //Contrabass
https://drive.google.com/file/d/1_AR7gk4iIIRFVL2Jv4Cshl9TjJa9-K-5/view?usp=sharing //Lead
https://drive.google.com/file/d/1tDpRoKoY_A6OFL9M0Kf8CV5boRPABTmY/view?usp=sharing //Pompe
https://drive.google.com/file/d/1XvJF0Xzq45WVjk4PspNq4yn8jksqEzYi/view?usp=sharing //Rythm bruit
https://drive.google.com/file/d/1rUR27A1Vv6ZSxMyZcybKD-VwZn6vb11x/view?usp=sharing //Rythm 1
*/