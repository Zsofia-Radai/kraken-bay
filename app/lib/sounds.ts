export const sounds = {
  coin: new Audio("/sounds/coins.wav"),
  shuffle: new Audio("/sounds/card-shuffle.mp3"),
  dive: new Audio("/sounds/splash.mp3"),
  flip: new Audio("sounds/flip.mp3"),
};

export function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}
