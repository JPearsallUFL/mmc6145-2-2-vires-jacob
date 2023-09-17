import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState("");
  const [previousTime, setPreviousTime] = useState("");

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  function handleGameEnd() {
    timerStop()
    handleTimes(time)
    timerReset()
  }

  function handleTimes(time) {
    setPreviousTime(time)
    if (!bestTime){
      setBestTime(time)
    }
    else if (bestTime > time) {
      setBestTime(time)
    }
    else return
  }

  return (
    <>
      <Header
        time = {time}
        previousTime = {previousTime}
        bestTime = {bestTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        onGameStart = {timerStart}
        onGameEnd = {handleGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

