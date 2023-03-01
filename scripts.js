const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playerWrapper = $(".player-wrapper");

// Playlist elements
const playlist = $(".playlist");
const playlistWrapper = $(".playlist-wrapper");

// Song's info elements
const thumbnail = $(".thumbnail");
const title = $(".title");
const author = $(".author");
const audio = $("#audio");

// Control elements
const playPause = $("#play-pause");
const songFlow = $("#song-flow");
const volumeIcon = $("#volume-icon");
const volumeBar = $(".volume-bar");
const progressBar = $(".progress-bar");
const nextBtn = $("#next");
const prevBtn = $("#prev");
const openPlaylist = $("#open-playlist");
const closePlaylist = $("#close-playlist");

// Sound wave strokes
const strokes = `
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
`;
// Mouse holding state for progress and volume bar
let isHoldingProgress = false;
let isHoldingVolume = false;

const app = {
  // Current song index
  currentIndex: 0,

  // Control state
  songFlowStates: ["repeat", "repeat_one", "shuffle"],
  songFlowIndex: 0,

  // Volume state
  volumeState: "volume_up",
  volumeOff: false,

  // Playlist is scrolled state
  isScrolled: true,

  // My playlist
  songs: [
    {
      title: "Seven years",
      author: "Lukas Graham",
      path: "./music/7YearsLukasGraham.mp3",
      image: "./image/7years.jpg",
    },
    {
      title: "A Thounsand Years",
      author: "Christina Perri",
      path: "./music/AThousandYearsChristinaPerri.mp3",
      image: "./image/athousandyears.jpg",
    },
    {
      title: "Airplane Mode",
      author: "Hayd",
      path: "./music/AirplaneModeHayd.mp3",
      image: "./image/airplanemode.jpg",
    },
    {
      title: "Angel Baby",
      author: "Troye Sivan",
      path: "./music/AngelBabyTroyeSivan.mp3",
      image: "./image/angelbaby.jpg",
    },
    {
      title: "Changes",
      author: "Hayd",
      path: "./music/ChangesHayd.mp3",
      image: "./image/changes.jpg",
    },
    {
      title: "Closure",
      author: "Hayd",
      path: "./music/ClosureHayd.mp3",
      image: "./image/closure.jpg",
    },
    {
      title: "Dandelions",
      author: "Ruth B",
      path: "./music/DandelionsRuthB.mp3",
      image: "./image/dandelions.jpg",
    },
    {
      title: "Glimpse Of Us",
      author: "Joji",
      path: "./music/GlimpseOfUsJoji.mp3",
      image: "./image/glimpseofus.jpg",
    },
    {
      title: "Heads in the clouds",
      author: "Hayd",
      path: "./music/HeadsinthecloudsHayd.mp3",
      image: "./image/headintheclouds.jpg",
    },
    {
      title: "When I held you again & Until I Found You",
      author: "Stephen Sanchez & Em Beihold",
      path: "./music/HeavenwhenIheldyouagainUntilIFoundYouStephenSanchezEmBeihold.mp3",
      image: "./image/UntilIfoundyou.jpg",
    },
    {
      title: "I fall apart",
      author: "Hayd",
      path: "./music/IfallapartHayd.mp3",
      image: "./image/ifallapart.jpg",
    },
    {
      title: "Landslide",
      author: "Oh Wonder",
      path: "./music/LandslideOhWonder.mp3",
      image: "./image/landside.jpg",
    },
    {
      title: "Love You Still",
      author: "Tyler Shaw",
      path: "./music/LoveYouStillTylerShaw.mp3",
      image: "./image/loveyoustill.jpg",
    },
    {
      title: "Perfect",
      author: "Ed Sheeran",
      path: "./music/PerfectEdSheeran.mp3",
      image: "./image/perfect.jpg",
    },
    {
      title: "Sunroof",
      author: "Nicky Youre dazy",
      path: "./music/SunroofNickyYouredazy.mp3",
      image: "./image/sunroof.jpg",
    },
    {
      title: "Superhero",
      author: "Hayd",
      path: "./music/SuperheroHayd.mp3",
      image: "./image/superhero.jpg",
    },
    {
      title: "That's us",
      author: "Anson Seabra",
      path: "music/ThatsusAnsonSeabra.mp3",
      image: "./image/thatsus.jpg",
    },
    {
      title: "Welcome to Wonderland",
      author: "Anson Seabra",
      path: "./music/WelcometoWonderlandAnsonSeabra.mp3",
      image: "./image/welcometowonderland.jpg",
    },
    {
      title: "What did I do",
      author: "Hayd",
      path: "./music/WhatdidIdoHayd.mp3",
      image: "./image/whatdidido.jpg",
    },
    {
      title: "Infinity",
      author: "Jaymes Young",
      path: "./music/Infinity.mp3",
      image: "./image/Infinity.jpg",
    },
    {
      title: "Under The Influence",
      author: "Chris Brown",
      path: "./music/UnderTheInfluence.mp3",
      image: "./image/undertheinfluence.jpg",
    },
    {
      title: "Say You Wont Let Go",
      author: "James Arthur",
      path: "./music/JamesArthurSayYouWontLetGo.mp3",
      image: "./image/sayyouwontletgo.jpg",
    },
    {
      title: "Dynasty",
      author: "MIIA",
      path: "./music/8y2mate.com-VietsubLyricsDynastyMIIA_320kbps.mp3",
      image: "./image/dynasty.jpg",
    },
    {
      title: "Easy On Me",
      author: "Adele",
      path: "./music/9y2mate.com-AdeleEasyOnMeOfficialLyricVideo_320kbps.mp3",
      image: "./image/easyonme.jpg",
    },
    {
      title: "Runaway",
      author: "AURORA",
      path: "./music/10y2mate.com-AURORARunaway_320kbps.mp3",
      image: "./image/runaway.jpg",
    },
    {
      title: "You Are The Reason",
      author: "Calum Scott",
      path: "./music/11y2mate.com-CalumScottYouAreTheReasonOfficialVideo_320kbps.mp3",
      image: "./image/youarethereason.jpg",
    },
    {
      title: "Hold On",
      author: "Chord Overstreet",
      path: "./music/12y2mate.com-ChordOverstreetHoldOnLyricVideo_320kbps.mp3",
      image: "./image/holdon.jpg",
    },
    {
      title: "Perfect",
      author: "Cole Norton",
      path: "./music/13y2mate.com-ColeNortonPerfectLyrics_320kbps.mp3",
      image: "./image/coleperfect.jpg",
    },
    {
      title: "Heather",
      author: "Conan Gray",
      path: "./music/14y2mate.com-ConanGrayHeather_320kbps.mp3",
      image: "./image/heather.jpg",
    },
    {
      title: "Here With Me",
      author: "D4VD",
      path: "music/15y2mate.com-d4vdWithMeLyrics_320kbps.mp3",
      image: "./image/herewithme.jpg",
    },
    {
      title: "Arcade",
      author: "Duncan Laurence",
      path: "./music/16y2mate.com-DuncanLaurenceArcadeLyricsftFLETCHER_320kbps.mp3",
      image: "./image/arcade.jpg",
    },
    {
      title: "Middle of the Night",
      author: "Elley Duhé",
      path: "./music/17y2mate.com-ElleyDuhéMiddleoftheNightLyrics_320kbps.mp3",
      image: "./image/middleofthenight.jpg",
    },
    {
      title: "21",
      author: "Gracie Abrams",
      path: "./music/18y2mate.com-GracieAbrams21acoustic_320kbps.mp3",
      image: "./image/21.jpg",
    },
    {
      title: "Lost",
      author: "Hayd",
      path: "./music/19y2mate.com-HaydLostOfficialLyricVideo_320kbps.mp3",
      image: "./image/lost.jpg",
    },
    {
      title: "Safe & Sound",
      author: "Hayd",
      path: "music/20y2mate.com-HaydSoundLyricsLyricVideo_320kbps.mp3",
      image: "./image/safeandsound.jpg",
    },
    {
      title: "Eyes Blue",
      author: "Heather",
      path: "./music/21y2mate.com-HeatherxEyesBlueLofiRemix_320kbps.mp3",
      image: "./image/eyesblue.jpg",
    },
    {
      title: "Take Me To Church",
      author: "Hozier",
      path: "./music/22y2mate.com-HozierTakeMeToChurchOfficialVideo_320kbps.mp3",
      image: "./image/takemetothechurch.jpg",
    },
    {
      title: "Bad Liar",
      author: "Imagine Dragons",
      path: "./music/23y2mate.com-ImagineDragonsBadLiarLyrics_320kbps.mp3",
      image: "./image/badliar.jpg",
    },
    {
      title: "Natural",
      author: "Imagine Dragons",
      path: "./music/24y2mate.com-ImagineDragonsNaturalOfficialMusicVideo_320kbps.mp3",
      image: "./image/natural.jpg",
    },
    {
      title: "Enemy",
      author: "Imagine Dragons x JID",
      path: "./music/25y2mate.com-ImagineDragonsxJIDEnemyLyrics_320kbps.mp3",
      image: "./image/enemy.jpg",
    },
    {
      title: "Golden Hour",
      author: "JVKE",
      path: "./music/26y2mate.com-JVKEgoldenhourofficialvideo_320kbps.mp3",
      image: "./image/goldenhour.jpg",
    },
    {
      title: "Can We Kiss Forever",
      author: "Kina",
      path: "./music/27y2mate.com-KinaCanWeKissForeverLyricsftAdrianaProenza_320kbps.mp3",
      image: "./image/canwekissforever.jpg",
    },
    {
      title: "La la la",
      author: "Naughty Boy ft Sam Smith",
      path: "music/28y2mate.com-LalalaNaughtyBoyftSamSmithCoverbyVONCKEN_320kbps.mp3",
      image: "./image/lalala.jpg",
    },
    {
      title: "I Like Me Better",
      author: "Lauv",
      path: "./music/29y2mate.com-LauvILikeMeBetterOfficialAudio_320kbps.mp3",
      image: "./image/ilikemebetter.jpg",
    },
    {
      title: "Someone You Loved",
      author: "Lewis Capaldi",
      path: "./music/30y2mate.com-LewisCapaldiSomeoneYouLoved_320kbps.mp3",
      image: "./image/someoneyouloved.jpg",
    },
    {
      title: "Double Take",
      author: "Dhruv",
      path: "./music/31y2mate.com-LyricsVietsubdoubletakedhruvslowed_320kbps.mp3",
      image: "./image/doubletake.jpg",
    },
    {
      title: "Set Fire To The Rain",
      author: "Adele",
      path: "./music/32y2mate.com-LyricsVietsubSetFireToTheRainAdele_320kbps.mp3",
      image: "./image/setfiretotherain.jpg",
    },
    {
      title: "I'll Be There",
      author: "Gabriela Bee",
      path: "music/33y2mate.com-LyricvietsubIllBeThereGabrielaBeecoverIllbethereforthehighsandlows_320kbps.mp3",
      image: "./image/iwillbethere.jpg",
    },
    {
      title: "My Stupid Heart",
      author: "Walk off the Earth",
      path: "./music/34y2mate.com-MyStupidHeartLyricVideoWalkofftheEarth_320kbps.mp3",
      image: "./image/mystupidheart.jpg",
    },
    {
      title: "Traitor",
      author: "Olivia Rodrigo",
      path: "./music/35y2mate.com-OliviaRodrigotraitorLyricVideo_320kbps.mp3",
      image: "./image/traitor.jpg",
    },
    {
      title: "At My Worst",
      author: "Pink Sweat & Kehlani",
      path: "./music/36y2mate.com-PinkSweatAtMyWorstfeatKehlaniOfficialVideo_320kbps.mp3",
      image: "./image/atmyworst.jpg",
    },
    {
      title: "Past lives",
      author: "Sapientdream",
      path: "./music/37y2mate.com-sapientdreampastliveslyrics_320kbps.mp3",
      image: "./image/pastlives.jpg",
    },
    {
      title: "Dancing With Your Ghost",
      author: "Sasha Alex Sloan",
      path: "./music/38y2mate.com-SashaAlexSloanDancingWithYourGhostLyricVideo_320kbps.mp3",
      image: "./image/dancingwithyourghost.jpg",
    },
    {
      title: "Older",
      author: "Sasha Alex Sloan",
      path: "./music/39y2mate.com-SashaAlexSloanOlderLyricVideo_320kbps.mp3",
      image: "./image/older.jpg",
    },
    {
      title: "Love Is Gone",
      author: "SLANDER",
      path: "./music/40y2mate.com-SLANDERLoveIsGoneftDylanMatthewAcoustic_320kbps.mp3",
      image: "./image/loveisgone.jpg",
    },
    {
      title: "So Far Away",
      author: "Martin Garrix",
      path: "./music/41y2mate.com-SoFarAwayAcousticMartinGarrixDavidGuettaCoverbyAdamChristopher_320kbps.mp3",
      image: "./image/sofaraway.jpg",
    },
    {
      title: "Somewhere only we know",
      author: "Gustixa & Rhianne",
      path: "./music/42y2mate.com-somewhereonlyweknowGustixaRhianne_320kbps.mp3",
      image: "./image/somewhereonlyweknow.jpg",
    },
    {
      title: "Sweater Weather",
      author: "The Neighbourhood",
      path: "./music/43y2mate.com-SweaterWeatherTheNeighbourhood_320kbps.mp3",
      image: "./image/theneighborhood.jpg",
    },
    {
      title: "Another Love",
      author: "Tom Odell",
      path: "./music/44y2mate.com-TomOdellAnotherLoveLyrics_320kbps.mp3",
      image: "./image/anotherlove.jpg",
    },
    {
      title: "Unstoppable",
      author: "Sia",
      path: "./music/45y2mate.com-UnstoppableSiaLyricsVietsub_320kbps.mp3",
      image: "./image/unstoppable.jpg",
    },
    {
      title: "I Love You 3000",
      author: "Stephanie Poetri",
      path: "music/46y2mate.com-VietsubILoveYou3000StephaniePoetri_320kbps.mp3",
      image: "./image/iloveyou3000.jpg",
    },
    {
      title: "Photograph",
      author: "Ed Sheeran",
      path: "./music/47y2mate.com-VietsubPhotographEdSheeranLyricsVideo_320kbps.mp3",
      image: "./image/photograph.jpg",
    },
    {
      title: "Before You Go",
      author: "Lewis capaldi",
      path: "./music/49y2mate.com-VietsubLyricsBeforeYouGoLewiscapaldi_320kbps.mp3",
      image: "./image/beforeyougo.jpg",
    },
    {
      title: "Demons",
      author: "Imagine Dragons",
      path: "./music/50y2mate.com-VietsubLyricsDemonsImagineDragons_320kbps.mp3",
      image: "./image/demon.jpg",
    },
    {
      title: "Scars To Your Beautiful",
      author: "Alessia Cara",
      path: "./music/51y2mate.com-VietsubLyricsScarsToYourBeautifulAlessiaCara_320kbps.mp3",
      image: "./image/scarstoyoubeautiful.jpg",
    },
    {
      title: "Pano",
      author: "Zack Tabudlo",
      path: "music/53y2mate.com-ZackTabudloPanoOfficialVietnameseLyricVideo_320kbps.mp3",
      image: "./image/pano.jpg",
    },
    {
      title: "Dusk Till Dawn",
      author: "ZAYN & Sia",
      path: "./music/54y2mate.com-ZAYNSiaDuskTillDawnLyrics_320kbps.mp3",
      image: "./image/dusktilldawn.jpg",
    },
    {
      title: "Echo",
      author: "Alexander Stewart",
      path: "./music/55y2mate.com-VietsubLyricsechoaucousticAlexanderStewart_320kbps.mp3",
      image: "./image/echo.jpg",
    },
    {
      title: "Jar of Hearts",
      author: "Fasetya",
      path: "./music/56y2mate.com-VietsubLyricsJarofHeartsFasetya_320kbps.mp3",
      image: "./image/jarofheart.jpg",
    },
    {
      title: "Symphony",
      author: "Clean Bandit",
      path: "./music/57y2mate.com-CleanBanditSymphonyLyricsfeatZaraLarsson_320kbps.mp3",
      image: "./image/symphony.jpg",
    },
    {
      title: "Tell Me That You Love Me",
      author: "James Smith",
      path: "./music/58y2mate.com-JamesSmithTellMeThatYouLoveMe_320kbps.mp3",
      image: "./image/tellmeyouloveme.jpg",
    },
    {
      title: "Paris In The Rain",
      author: "Lauv",
      path: "./music/59y2mate.com-LauvParisInTheRainLyricVideo_320kbps.mp3",
      image: "./image/parisintherain.jpg",
    },
    {
      title: "Rolling In The Deep",
      author: "Adele",
      path: "./music/60y2mate.com-RollingInTheDeepAdeleLyrics_320kbps.mp3",
      image: "./image/rollinginthedeep.jpg",
    },
    {
      title: "Shadow Of The Sun",
      author: "王OK",
      path: "./music/61y2mate.com-ShadowOfTheSun王OKCoverLyricsVietsubTikTok_320kbps.mp3",
      image: "./image/shadowofthesun.jpg",
    },
    {
      title: "Someone Like You",
      author: "Adele",
      path: "./music/62y2mate.com-SomeoneLikeYouAdeleLyrics_320kbps.mp3",
      image: "./image/someonelikeyou.jpg",
    },
    {
      title: "Teenage Dream",
      author: "Stephen Dawes",
      path: "./music/63y2mate.com-StephenDawesTeenageDreamLyricVideo_320kbps.mp3",
      image: "./image/teenagedream.jpg",
    },
    {
      title: "Be Alright",
      author: "Dean Lewis",
      path: "./music/64y2mate.com-VietsubLyricsBeAlrightDeanLewis_320kbps.mp3",
      image: "./image/bealright.jpg",
    },
    {
      title: "The One That Got Away",
      author: "Brielle Von Hugel Katy Perry",
      path: "./music/65y2mate.com-VietsubLyricsTheOneThatGotAwayBrielleVonHugelKatyPerryCover_320kbps.mp3",
      image: "./image/theonethatgotaway.jpg",
    },
    {
      title: "Too Good At Goodbyes",
      author: "Sam Smith",
      path: "./music/66y2mate.com-VietsubLyricsTooGoodAtGoodbyesSofiaKarlbergSamSmithCover_320kbps.mp3",
      image: "./image/toogoodattogoodbyes.jpg",
    },
    {
      title: "You Said Youd Grow Old With Me",
      author: "Michael Schulte",
      path: "./music/67y2mate.com-VietsubLyricsYouSaidYoudGrowOldWithMeMichaelSchulte_320kbps.mp3",
      image: "./image/yousaidyougrowwithme.jpg",
    },
    {
      title: "To The Moon",
      author: "Hooligan",
      path: "./music/68y2mate.com-VietsubToTheMoonhooligan_320kbps.mp3",
      image: "./image/tothemoon.jpg",
    },
    {
      title: "After the Afterparty",
      author: "Charli XCX feat Lil Yachty",
      path: "./music/69y2mate.com-VietsubLyricsAftertheAfterpartyCharliXCXfeatLilYachty_320kbps.mp3",
      image: "./image/aftertheparty.jpg",
    },
    {
      title: "Counting Stars",
      author: "OneRepublic",
      path: "./music/70y2mate.com-VietsubLyricsCountingStarsOneRepublic_320kbps.mp3",
      image: "./image/countingstars.jpg",
    },
    {
      title: "Fire On Fire",
      author: "Sam Smith",
      path: "./music/71y2mate.com-VietsubLyricsFireOnFireSamSmith_320kbps.mp3",
      image: "./image/fireonfire.jpg",
    },
    {
      title: "I Do",
      author: "911",
      path: "./music/72y2mate.com-VietsubLyricsIDo911_320kbps.mp3",
      image: "./image/ido.jpg",
    },
    {
      title: "Just Give Me a Reason",
      author: "Pnk Nate Ruess",
      path: "./music/73y2mate.com-VietsubLyricsJustGiveMeaReasonPnkNateRuess_320kbps.mp3",
      image: "./image/justgivemeareason.jpg",
    },
    {
      title: "Mood",
      author: "24kGoldn",
      path: "./music/74y2mate.com-VietsubLyricsMood24kGoldn_320kbps.mp3",
      image: "./image/mood.jpg",
    },
    {
      title: "Send My Love",
      author: "Landon Austin & Kaya May",
      path: "./music/75y2mate.com-VietsubLyricsSendMyLoveSitStillLookPrettyLandonAustinandKayaMay_320kbps.mp3",
      image: "./image/sendmylove.jpg",
    },
  ],

  // Setting timer format
  timerFormat(duration) {
    const rounded = Math.floor(duration);
    return `${
      Math.floor(rounded / 60) >= 10
        ? Math.floor(rounded / 60)
        : "0" + Math.floor(rounded / 60)
    }:${rounded % 60 >= 10 ? rounded % 60 : "0" + (rounded % 60)}`;
  },

  // Function runs every time song change event happens
  setChangeSong(newIndex) {
    $$(".wave")[this.currentIndex].innerHTML = this.timerFormat(
      $$(".duration-display")[this.currentIndex].duration
    );
    this.currentIndex = newIndex;
    $$(".wave")[this.currentIndex].innerHTML = strokes;
    this.renderPlayer();
    this.isScrolled = false;
    audio.play();
  },

  // Handle events function
  eventHandler() {
    const playListItems = $$(".playlist-item");

    // Change song every time a song is clicked
    playListItems.forEach((playListItem, index) => {
      playListItem.onclick = () => {
        this.setChangeSong(index);
      };
    });

    // Spinning animation of the thumbnail
    const thumbnailAnimation = thumbnail.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 8000,
        iterations: Infinity,
      }
    );

    // Animation paused when initialized
    thumbnailAnimation.pause();

    // Updates song's duration when audio's metadata first update
    audio.onloadedmetadata = () => {
      $("#begin").innerText = this.timerFormat(audio.currentTime);
      $("#end").innerText = this.timerFormat(audio.duration);
    };

    // Updates current time and progress bar
    audio.ontimeupdate = () => {
      let progressBarWidth = (audio.currentTime / audio.duration) * 100;
      $("#begin").innerText = this.timerFormat(audio.currentTime);
      $(".progress").style.width = `${progressBarWidth}%`;
    };

    // Volume change event
    audio.onvolumechange = () => {
      if (audio.muted) volumeIcon.innerHTML = "volume_off";
      else
        volumeIcon.innerText =
          audio.volume >= 0.5
            ? "volume_up"
            : audio.volume < 0.05
            ? "volume_mute"
            : "volume_down";
      $(".volume").style.width = `${audio.volume * 100}%`;
    };

    // Song's change flow every time a song is ended
    audio.onended = () => {
      if (this.songFlowIndex === 2) {
        // Making sure that the song is not repeated
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.setChangeSong(newIndex);
      } else nextBtn.click();
    };

    // Play and pause event
    audio.onplay = () => {
      playPause.innerText = "pause_circle";
      thumbnailAnimation.play();
    };
    audio.onpause = () => {
      playPause.innerText = "play_circle";
      thumbnailAnimation.pause();
    };

    // Open playlist
    openPlaylist.onclick = () => {
      playlist.classList.add("active");

      if (!this.isScrolled) {
        setTimeout(() => {
          $$(".playlist-item")[this.currentIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);

        this.isScrolled = true;
      }
    };

    // Clost playlist
    closePlaylist.onclick = () => playlist.classList.remove("active");

    // Skip to next or previous song
    nextBtn.onclick = () => {
      if (this.currentIndex === this.songs.length - 1) this.setChangeSong(0);
      else this.setChangeSong(this.currentIndex + 1);
    };
    prevBtn.onclick = () => {
      if (this.currentIndex === 0) this.setChangeSong(this.songs.length - 1);
      else this.setChangeSong(this.currentIndex - 1);
    };

    // Change the flow state
    songFlow.onclick = () => {
      this.songFlowIndex =
        this.songFlowIndex + 1 > 2 ? 0 : this.songFlowIndex + 1;
      songFlow.innerText = this.songFlowStates[this.songFlowIndex];
      if (this.songFlowIndex === 1) audio.loop = true;
      else audio.loop = false;
    };

    // Play pause button event
    playPause.onclick = () => {
      audio.paused ? audio.play() : audio.pause();
    };

    // Turn on and off the volume
    volumeIcon.onclick = () => {
      audio.muted = !audio.muted;
    };

    // ----------------DRAGGING ANIMATION ON PROGRESS AND VOLUME BAR----------------
    // Mouse down event
    volumeBar.onmousedown = (e) => {
      isHoldingVolume = true;
      audio.volume = e.offsetX / e.target.offsetWidth;
    };
    progressBar.onmousedown = (e) => {
      isHoldingProgress = true;
      audio.currentTime = (e.offsetX / e.target.offsetWidth) * audio.duration;
    };

    // Dragging event
    volumeBar.onmousemove = (e) => {
      if (isHoldingVolume) audio.volume = e.offsetX / e.target.offsetWidth;
    };
    progressBar.onmousemove = (e) => {
      if (isHoldingProgress)
        audio.currentTime = (e.offsetX / e.target.offsetWidth) * audio.duration;
    };

    // Mouse up event
    window.onmouseup = () => {
      isHoldingProgress = false;
      isHoldingVolume = false;
    };

    // Accessibility improvement with keydown events on space bar & arrow keys
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 32:
          e.preventDefault();
          playPause.click();
          break;
        case 37:
          e.preventDefault();
          audio.currentTime -= 5;
          break;
        case 38:
          e.preventDefault();
          audio.volume + 0.05 < 1 ? (audio.volume += 0.05) : (audio.volume = 1);
          break;
        case 39:
          e.preventDefault();
          audio.currentTime += 5;
          break;
        case 40:
          e.preventDefault();
          audio.volume - 0.05 > 0 ? (audio.volume -= 0.05) : (audio.volume = 0);
          break;
      }
    };
  },

  // Render the song playlist
  renderPlaylist() {
    const htmls = this.songs
      .map((song) => {
        return `
            <li class="playlist-item">
               <div class="playlist-thumb" style="background-image: url(${song.image})"></div>
               <div class="song-info">
                  <span class="playlist-title">${song.title}</span>
                  <span class="playlist-author">${song.author}</span>
               </div>
               <audio class="duration-display" preload="metadata" src=${song.path}></audio>
               <div class="wave"></div>
            </li>
         `;
      })
      .join("");

    playlistWrapper.innerHTML = htmls;
    const durations = $$(".duration-display");
    const wave = $$(".wave");

    // Initialize isPlaying state and add song's duration at the end for every song in
    // the playlist
    durations.forEach((duration, index) => {
      duration.onloadedmetadata = () => {
        wave[index].innerHTML =
          index === this.currentIndex
            ? strokes
            : this.timerFormat(duration.duration);
      };
    });
  },

  // Render the player
  renderPlayer() {
    const currentSong = this.songs[this.currentIndex];
    thumbnail.style.backgroundImage = `url(${currentSong.image})`;
    title.innerText = currentSong.title;
    author.innerText = currentSong.author;
    audio.src = currentSong.path.trim("");
  },

  start() {
    this.renderPlayer();
    this.renderPlaylist();
    this.eventHandler();

    // Initialize the default volume
    audio.volume = 0.5;
  },
};

app.start();

/** P/S:
 * - audio.volume only works on desktop devices for some reasons
 */
