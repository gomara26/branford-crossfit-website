interface YT {
  Player: any;
}

interface Window {
  YT: YT;
  onYouTubeIframeAPIReady: () => void;
} 