<template>
    <div id="audio-player">
      <!-- File input section -->
      <div class="file-input-container">
        <input
          type="file"
          @change="loadAudio"
          accept="audio/*"
          class="file-input"
        />
        <p v-if="audioName" class="file-name">Выбранный файл: {{ audioName }}</p>
      </div>
  
      <!-- Audio player section -->
      <div v-if="audioName" class="player-container">
        <audio ref="audioPlayer" :src="audioSrc" controls hidden></audio>
        <p class="file-name-large">{{ audioName }}</p>
        <div class="custom-controls">
          <button @click="rewind" class="control-button">⏪ 15 сек</button>
          <button @click="togglePlayPause" class="control-button">
            {{ isPlaying ? "⏸ Пауза" : "▶ Играть" }}
          </button>
          <button @click="fastForward" class="control-button">15 сек ⏩</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomAudioPlayer",
    data() {
      return {
        audioSrc: "", 
        audioName: "", 
        isPlaying: false, // Playback state
      };
    },
    methods: {
      loadAudio(event) {
        const file = event.target.files[0];
        if (file) {
          this.audioName = file.name;
          this.audioSrc = URL.createObjectURL(file);
          this.isPlaying = false; // Reset playback state
          const player = this.$refs.audioPlayer;
          if (player) player.pause(); // Ensure player is stopped
        }
      },
      togglePlayPause() {
        const player = this.$refs.audioPlayer;
        if (player) {
          if (this.isPlaying) {
            player.pause();
          } else {
            player.play();
          }
        }
        this.isPlaying = !this.isPlaying;
      },
      rewind() {
        const player = this.$refs.audioPlayer;
        if (player) player.currentTime = Math.max(0, player.currentTime - 15);
      },
      fastForward() {
        const player = this.$refs.audioPlayer;
        if (player) player.currentTime = Math.min(player.duration, player.currentTime + 15);
      },
    },
  };
  </script>
  
  <style lang="less">
  #audio-player {
    font-family: "Arial", sans-serif;
    max-width: 500px;
    margin: 30px auto;
    text-align: center;
  
    .file-input-container {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      background: #f9f9f9;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
  
      .file-input {
        display: block;
        margin: 0 auto 15px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #ffffff;
        cursor: pointer;
        font-size: 14px;
        color: #333;
  
        &:hover {
          border-color: #aaa;
          background: #f7f7f7;
        }
      }
  
      .file-name {
        font-weight: bold;
        font-size: 14px;
        color: #666;
      }
    }
  
    .player-container {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
      .file-name-large {
        font-weight: bold;
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;
      }
  
      .custom-controls {
        display: flex;
        justify-content: space-between;
        gap: 10px;
  
        .control-button {
          flex: 1;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
  
          &:hover {
            background-color: #0056b3;
          }
  
          &:focus {
            outline: none;
            box-shadow: 0 0 4px rgba(0, 123, 255, 0.8);
          }
        }
      }
    }
  }
  </style>
  