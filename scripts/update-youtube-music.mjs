import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const marker = "<!-- invite297-youtube-music -->";
const endMarker = "<!-- /invite297-youtube-music -->";
const videoId = "Gcxv7i02lXc";

const block = `${marker}
<div id="bg-youtube-player" style="position:fixed;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none;" aria-hidden="true"></div>
<script>
(function () {
  var YT_VIDEO_ID = "${videoId}";
  var YT_START_SECONDS = 40;
  var ytPlayer = null;
  var ytReady = false;
  var shouldPlay = false;

  function playMusic() {
    if (ytPlayer && ytReady) {
      ytPlayer.setVolume(40);
      ytPlayer.seekTo(YT_START_SECONDS, true);
      ytPlayer.playVideo();
    } else {
      shouldPlay = true;
    }
  }

  function pauseMusic() {
    shouldPlay = false;
    if (ytPlayer && ytReady) ytPlayer.pauseVideo();
  }

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("bg-youtube-player", {
      height: "0",
      width: "0",
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: YT_VIDEO_ID,
        start: YT_START_SECONDS,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady: function () {
          ytReady = true;
          if (shouldPlay) playMusic();
        },
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.ENDED) {
            ytPlayer.seekTo(YT_START_SECONDS, true);
            ytPlayer.playVideo();
          }
        },
      },
    });
  };

  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  $(document).ready(function () {
    var fadeTime = 300;
    $(".stopbgmusic").hide();

    $(".playbgmusic").click(function () {
      playMusic();
      $(this).fadeOut(fadeTime);
      $(".stopbgmusic").fadeIn(fadeTime);
    });

    $(".stopbgmusic").click(function (e) {
      e.preventDefault();
      pauseMusic();
      $(this).fadeOut(fadeTime);
      $(".playbgmusic").fadeIn(fadeTime);
    });
  });
})();
</script>
<style>
div[class*="bgmusic"] {
  cursor: pointer;
  z-index: 99 !important;
}
</style>
${endMarker}`;

const oldAudioBlock =
  /<!-- nominify begin --> <audio id="bg-sound" loop>[\s\S]*?<!-- nominify end -->/;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (html.includes(marker)) {
    html = html.replace(
      new RegExp(`${marker}[\\s\\S]*?${endMarker}`),
      block,
    );
  } else if (oldAudioBlock.test(html)) {
    html = html.replace(oldAudioBlock, `<!-- nominify begin --> ${block} <!-- nominify end -->`);
  } else {
    console.error(`Music block not found in ${path.basename(file)}`);
    process.exit(1);
  }

  fs.writeFileSync(file, html);
  console.log(`Updated background music to YouTube in ${path.basename(file)}`);
}
