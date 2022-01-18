import React, { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import Button from "../components/Button";

const FullControl = function () {
  const sources = [
    [
      [
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128)s.mp3",
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128)s.mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-thumbnail/35/0635/1311180635?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک اول",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128).mp3",
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128)s.mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-cover/22/0872/1756570872?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک دوم",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128)s.mp3",
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128)s.mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-thumbnail/35/0635/1311180635?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک سوم",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128).mp3",
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128).mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-cover/22/0872/1756570872?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک چهارم",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128)s.mp3",
        "https://dls.music-fa.com/tagdl/99/Mehraj%20-%20Talkh%20(128).mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-thumbnail/35/0635/1311180635?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک پتجم",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128).mp3",
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128).mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-cover/22/0872/1756570872?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک ششم",
    ],
    [
      [
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128).mp3",
        "https://dls.music-fa.com/tagdl/ali/Mojtaba%20Karami%20-%20Aah%20(128).mp3",
      ],
      "https://tbn3-cdn.zarebin.ir/ava-cover/22/0872/1756570872?zb_src=ava-prod-rgw.kp0.mci.dev&zb_dmn=ava-prod-rgw.kp0.mci.dev&zb_scm=https",
      "موزیک هفتم",
    ],
  ];
  const [source, setSource] = useState(sources[0]);
  const player = useRef();
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState(0.0);
  const [rate, setRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const raf = useRef();
  const [user, setUser] = useState(true);
  const [numUrl, setNumUrl] = useState(0);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    clearRAF();
    
  }, []);
  useEffect(()=>{
    setNumUrl(0)
  },[currentSrcIndex])
  function handleToggle() {
    setPlaying(!playing);
    clearRAF();
    console.log(numUrl);
    if (flag) {
      incorrecturl();
      setPlaying(false);
    }
  }

  function handleOnLoad() {
    setLoaded(true);
    setDuration(player.current.duration());
    
  }

  function handleOnPlay() {
    
    setPlaying(true);
    renderSeekPos();
  }

  function handleOnEnd() {
    setPlaying(true);
    clearRAF();
  }

  function handleNext() {
    setFlag(false);
    setPlaying(false)
    const nextIndex = currentSrcIndex === 6 ? 0 : Number(currentSrcIndex) + 1;
    setCurrentSrcIndex(nextIndex);
  }
  function handleBefore() {
    // setNumUrl(0);
    setFlag(false);
    const nextIndex = currentSrcIndex === 0 ? 6 : Number(currentSrcIndex) - 1;
    setCurrentSrcIndex(nextIndex);
  }

  function handleLoopToggle() {
    setLoop(!loop);
  }

  function handleMuteToggle() {
    setMute(!mute);
  }

  function handleMouseDownSeek() {
    setIsSeeking(true);
  }

  function handleMouseUpSeek(e) {
    setIsSeeking(false);
    player.current.seek(e.target.value);
  }

  function handleSeekingChange(e) {
    player.current.seek(parseFloat(e.target.value));
  }
  function handlePlus() {
    player.current.seek(seek + 10);
    incorrecturl();
  }
  function handleMines() {
    player.current.seek(seek - 10);
    incorrecturl();
  }
  function renderSeekPos() {
    if (!isSeeking) {
      setSeek(player.current.seek());
      raf.current = requestAnimationFrame(renderSeekPos);
    }
  }

  function handleRate(e) {
    const rate = parseFloat(e.target.value);
    player.current.rate(rate);
  }

  function clearRAF() {
    cancelAnimationFrame(raf.current);
  }
  function change() {
    if (numUrl > 0) {
      setFlag(true);
      alert("You got error");
    } else {
      setNumUrl(numUrl + 1);
     
    }
  }
  function incorrecturl() {
    if (flag) {
      event.preventDefault();
      alert("You got error");
    }
  }
  return (
    <div className="whole">
      {user && (
        <div className="full-control">
          <ReactHowler
            src={sources[currentSrcIndex][0][numUrl]}
            playing={playing}
            onLoad={handleOnLoad}
            onPlay={handleOnPlay}
            onEnd={handleOnEnd}
            loop={loop}
            mute={mute}
            volume={volume}
            ref={player}
            onLoadError={(id, error) => {
              change();
            }}
          />
          <div className="imgContainer">
            <img src={sources[currentSrcIndex][1]}></img>
          </div>
          <div className="name">
            <div className="songName">اسم موزیک</div>
            <div className="artistName">{sources[currentSrcIndex][2]}</div>
          </div>
          <div className="download">
            <a
              href={sources[currentSrcIndex][0][numUrl]}
              onClick={incorrecturl}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.2 0a.8.8 0 00-.8.8v6.4H3.6a.4.4 0 00-.283.683l.025.023 4.084 3.852.027.025a.8.8 0 001.094 0l.011-.009.008-.009 4.083-3.85.023-.022h.006A.4.4 0 0012.4 7.2H9.6V.8a.8.8 0 00-.8-.8H7.2zM.8 14.4a.8.8 0 100 1.6h14.4a.8.8 0 100-1.6z"></path>
              </svg>
            </a>
          </div>
          <div className="toggles-repeat">
            <div onClick={handleLoopToggle}>
              {loop ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.791 2a.8.8 0 00-.557 1.372l1.035 1.033H4.4A2.4 2.4 0 002 6.802v5.96l1.6-1.597V6.802c0-.44.36-.799.8-.799h10.869l-1.035 1.033a.798.798 0 00.872 1.31.8.8 0 00.26-.18l2.4-2.397a.798.798 0 000-1.13l-2.4-2.397A.8.8 0 0014.79 2zM10.15 7.212a.6.6 0 00-.14.029l-1.2.399a.599.599 0 10.38 1.137l.41-.137v3.524a.6.6 0 001.2 0V7.809a.6.6 0 00-.65-.597zm7.85.022l-1.6 1.598v4.362c0 .44-.36.8-.8.8H4.731l1.035-1.034a.799.799 0 10-1.132-1.13l-2.4 2.397a.798.798 0 000 1.13l2.4 2.397a.8.8 0 101.132-1.13L4.73 15.591H15.6a2.4 2.4 0 002.4-2.397v-5.96z"
                    fill="#fff"
                  ></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.791 2a.8.8 0 00-.557 1.372l1.035 1.033H4.4A2.4 2.4 0 002 6.802v5.96l1.6-1.597V6.802c0-.44.36-.799.8-.799h10.869l-1.035 1.033a.798.798 0 00.872 1.31.8.8 0 00.26-.18l2.4-2.397a.798.798 0 000-1.13l-2.4-2.397A.8.8 0 0014.79 2zM18 7.234l-1.6 1.598v4.362c0 .44-.36.8-.8.8H4.731l1.035-1.034a.799.799 0 10-1.132-1.13l-2.4 2.397a.798.798 0 000 1.13l2.4 2.397a.8.8 0 101.132-1.13L4.73 15.591H15.6a2.4 2.4 0 002.4-2.397v-5.96z"></path>
                </svg>
              )}
            </div>
          </div>
          <div class="slider-container">
            <div class="duration">
              <div>{duration ? duration.toFixed(2) : "NaN"}</div>
              <div>{seek.toFixed(2)}</div>
            </div>
            <div className="seek">
              <span className="slider-container">
                <input
                  type="range"
                  min="0"
                  max={duration ? duration.toFixed(2) : 0}
                  step=".01"
                  value={seek}
                  onChange={handleSeekingChange}
                  onMouseDown={handleMouseDownSeek}
                  onMouseUp={handleMouseUpSeek}
                />
              </span>
            </div>
          </div>
          <div class="handels">
            <div onClick={handleMines}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.388 14.565v-.616c0-.48-.017-.927-.05-1.341a13.525 13.525 0 00-.567-3.021l1.415-.45c.337 1.084.546 2.204.624 3.337.036.45.055.938.058 1.45v1.225c-.006.327-.009.552-.009.675H8.37c0-.136.004-.37.01-.702v-.276l.009-.28zm6.152-4.355a16.038 16.038 0 00-1.088-1.075l-.368-.318a.907.907 0 00-.063-.05.53.53 0 00-.045-.04l-.045-.036-.909 1.176c.054.045.128.107.222.182-.24.293-.454.569-.639.828a9.023 9.023 0 00-.77 1.273 3.42 3.42 0 00-.395 1.467c0 .6.128 1.088.385 1.464.162.242.383.437.642.566.276.132.578.199.884.195a1.282 1.282 0 001.05-.507c.13.156.297.278.484.357.194.09.404.136.617.136a1.98 1.98 0 00.699-.11c.255-.096.477-.263.639-.482.289-.383.433-.922.433-1.617 0-.993-.578-2.13-1.734-3.41zm.253 3.971a.357.357 0 01-.29.164h-.046a.3.3 0 01-.3-.173.44.44 0 01-.04-.15l-.01-.063v-.042a22.19 22.19 0 00-.045-.544l-1.255.19c.011.093.017.187.018.28a.82.82 0 01-.032.254.405.405 0 01-.435.264.45.45 0 01-.397-.213.9.9 0 01-.144-.53c0-.354.191-.808.574-1.364.133-.192.298-.41.495-.651l.236-.282.054-.063.05-.063.095-.114.068.073.063.072c.957 1.065 1.435 1.878 1.435 2.44a1.04 1.04 0 01-.094.515z"></path>
                <path d="M21 11.996a9 9 0 11-18 0v-.029a.9.9 0 111.8.026 7.2 7.2 0 101.973-4.947h1.2a.9.9 0 11-.026 1.8H5.17a.886.886 0 01-.406 0 .9.9 0 01-.864-.9v-3.15a.9.9 0 01.887-.914h.025a.9.9 0 01.888.914v.777A9 9 0 0121 11.996z"></path>
              </svg>
            </div>

            <div>
              <div onClick={handleBefore}>
                <svg
                  id="flip"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="disabled"
                >
                  <path d="M15.111 2c-.851 0-1.555.704-1.555 1.556V7.94L4.373 2.27C3.366 1.648 2 2.41 2 3.594v12.812c0 1.184 1.366 1.946 2.373 1.324l9.183-5.67v4.384c0 .852.704 1.556 1.555 1.556h1.333c.852 0 1.556-.704 1.556-1.556V3.556C18 2.704 17.296 2 16.444 2h-1.333z"></path>
                </svg>
              </div>
            </div>
            <div className="toggle">
              <div onClick={handleToggle}>
                {playing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 0a1.873 1.873 0 00-2 1.714v8.571A1.873 1.873 0 002 12a1.873 1.873 0 002-1.714V1.714A1.873 1.873 0 002 0zm8 0a1.873 1.873 0 00-2 1.714v8.571A1.873 1.873 0 0010 12a1.873 1.873 0 002-1.714V1.714A1.873 1.873 0 0010 0z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path d="M1 1.135v11.73a1.152 1.152 0 001.769.956l9.364-5.865a1.122 1.122 0 000-1.911L2.769.18A1.152 1.152 0 001 1.135z"></path>
                  </svg>
                )}
              </div>
            </div>

            <div>
              <div onClick={handleNext}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="disabled"
                >
                  <path d="M15.111 2c-.851 0-1.555.704-1.555 1.556V7.94L4.373 2.27C3.366 1.648 2 2.41 2 3.594v12.812c0 1.184 1.366 1.946 2.373 1.324l9.183-5.67v4.384c0 .852.704 1.556 1.555 1.556h1.333c.852 0 1.556-.704 1.556-1.556V3.556C18 2.704 17.296 2 16.444 2h-1.333z"></path>
                </svg>
              </div>
            </div>
            <div onClick={handlePlus}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.54 10.212a16.04 16.04 0 00-1.088-1.074l-.368-.318a.907.907 0 00-.063-.05.53.53 0 00-.045-.04l-.045-.036-.909 1.176c.054.045.128.107.222.182-.243.3-.45.568-.639.828-.291.402-.55.828-.77 1.273a3.42 3.42 0 00-.395 1.467 2.55 2.55 0 00.382 1.461c.162.241.384.436.644.566.275.132.578.199.883.195a1.284 1.284 0 001.05-.507c.13.156.297.278.485.357.192.09.402.136.615.136.238.007.475-.03.7-.108.256-.094.478-.261.64-.481.29-.383.435-.922.434-1.617 0-.993-.578-2.13-1.734-3.41zm.253 3.972a.361.361 0 01-.291.164h-.045a.3.3 0 01-.3-.173.44.44 0 01-.04-.15l-.01-.063v-.042a22.19 22.19 0 00-.045-.544l-1.255.19c.01.093.017.187.018.28a.822.822 0 01-.032.254.405.405 0 01-.435.264.45.45 0 01-.399-.213.913.913 0 01-.135-.526c0-.353.192-.808.575-1.364.133-.192.3-.41.493-.65l.236-.283.055-.063.05-.063c.039-.045.07-.084.094-.114l.07.074.062.072c.952 1.062 1.428 1.873 1.428 2.434a1.04 1.04 0 01-.094.516z"></path>
                <path d="M21 11.97v.026a9 9 0 11-2.7-6.423v-.774a.9.9 0 01.888-.914h.026a.9.9 0 01.886.914v3.15a.9.9 0 01-.864.9.887.887 0 01-.407 0H16.05a.9.9 0 11-.026-1.8h1.2a7.2 7.2 0 101.976 4.95.9.9 0 111.8-.026v-.003z"></path>
                <path d="M8.388 14.568v-.616c0-.48-.017-.927-.05-1.341a13.61 13.61 0 00-.567-3.021l1.413-.45c.338 1.084.548 2.204.626 3.337.036.45.055.938.058 1.45v1.225c-.006.327-.009.552-.009.675H8.37c0-.136.004-.37.01-.702v-.276l.009-.28z"></path>
              </svg>
            </div>
          </div>
          <div className="toggles-mute">
            <div onClick={handleMuteToggle}>
              {mute ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="player-large__mute"
                >
                  <path d="M2.6 2a.6.6 0 00-.418 1.03l3.772 3.772H4.208A1.8 1.8 0 002.41 8.6v2.798c0 .99.807 1.798 1.798 1.798h2.645l3.685 3.276a1.106 1.106 0 001.203.185c.408-.184.66-.576.66-1.02v-2.389l4.567 4.568a.6.6 0 10.848-.848L3.029 2.182A.6.6 0 002.6 2zm8.67 1.24c-.264.002-.522.1-.732.285L8.172 5.631 12.4 9.859V4.36a1.11 1.11 0 00-.66-1.02 1.123 1.123 0 00-.47-.1zm4.584 1.966a.598.598 0 00-.484.873c1.25 2.389 1.367 4.72.352 7.101l.903.903c1.354-2.841 1.29-5.718-.192-8.556a.596.596 0 00-.58-.321zm-1.774 2a.603.603 0 00-.528.85c.495 1.084.579 2.139.255 3.21l.935.935c.64-1.543.607-3.101-.1-4.644a.599.599 0 00-.562-.35z"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="player-large__mute"
                >
                  <path d="M10.086 2a.822.822 0 00-.144.013.926.926 0 00-.539.318v.001l-3.357 3.88H3.638C2.74 6.213 2 7.176 2 8.344v3.314c0 1.168.74 2.13 1.638 2.13h2.408l3.357 3.881c.314.363.758.416 1.094.22.337-.197.603-.665.603-1.21V3.322c0-.545-.265-1.013-.602-1.21A.818.818 0 0010.086 2zm5.825.417a.462.462 0 00-.267.107.669.669 0 00-.191.265.887.887 0 00.011.702c1.96 4.396 1.967 8.623.001 13.017a.919.919 0 00-.068.548c.018.092.05.18.093.256.044.076.1.14.163.188a.468.468 0 00.206.09.425.425 0 00.217-.02.515.515 0 00.194-.13.7.7 0 00.139-.218c2.125-4.752 2.118-9.692 0-14.443a.654.654 0 00-.21-.272.448.448 0 00-.288-.09zM14.287 4.31a.452.452 0 00-.27.091.648.648 0 00-.201.254.886.886 0 00-.012.703c1.259 3.136 1.259 6.149 0 9.285a.915.915 0 00-.042.546.77.77 0 00.102.246.602.602 0 00.167.176.428.428 0 00.42.046.53.53 0 00.189-.137.716.716 0 00.132-.22c1.398-3.483 1.398-7.117 0-10.6a.675.675 0 00-.2-.284.457.457 0 00-.285-.106zm-1.669 2.374a.46.46 0 00-.255.1.654.654 0 00-.19.243.898.898 0 00-.026.671c.553 1.572.552 3.04-.002 4.612a.889.889 0 00.094.782.58.58 0 00.173.163.433.433 0 00.419.02.546.546 0 00.182-.146.736.736 0 00.125-.226 8.632 8.632 0 00.003-5.795.688.688 0 00-.211-.317.453.453 0 00-.312-.107z"></path>
                </svg>
              )}
            </div>
          </div>
          <div className="closeWindow">
            <div onClick={close}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="player-large__mute"
              >
                <path d="M.71 0a.713.713 0 00-.5 1.224l3.78 3.774L.216 8.772A.713.713 0 101.224 9.78l3.774-3.77 3.774 3.774A.713.713 0 109.78 8.776L6.01 4.998l3.77-3.774A.713.713 0 108.772.216L4.998 3.99 1.224.216A.713.713 0 00.71 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FullControl;
