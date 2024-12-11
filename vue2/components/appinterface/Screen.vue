<template>
  <div id="app">
    <div class="app-grid">
      <div
        class="container"
        ref="container"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          class="page"
          v-for="(page, index) in paginatedCards"
          :key="index"
        >
          <div class="grid">
            <div
              class="card"
              v-for="card in page"
              :key="card.id"
              @click="openLink(card.link)"
              :title="card.description"
            >
              <div class="card-image">
                <span class="material-icons">{{ card.icon }}</span>
              </div>
              <div class="card-title">{{ card.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination">
        <span
          v-for="(page, index) in paginatedCards"
          :key="index"
          :class="{ active: index === currentPage }"
          @click="scrollToPage(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: Array.from({ length: 40 }, (_, i) => {
        const { icon, title } = getMaterialIcon(i); 
        return {
          id: i + 1,
          icon: icon, 
          title: title, 
          description: `${title}`, 
          link: "#", 
        };
      }),
      currentPage: 0,
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  computed: {
    paginatedCards() {
      const chunkSize = 20; // Display 20 apps per page
      const pages = [];
      for (let i = 0; i < this.cards.length; i += chunkSize) {
        pages.push(this.cards.slice(i, i + chunkSize));
      }
      return pages;
    },
  },
  methods: {
    scrollToPage(pageIndex) {
      this.currentPage = pageIndex;
      const container = this.$refs.container;
      const pageWidth = container.clientWidth;
      container.scrollTo({
        left: pageWidth * pageIndex,
        behavior: "smooth",
      });
    },
    openLink(link) {
      if (link) window.open(link, "_blank");
    },
    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    onTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    onTouchEnd() {
      const delta = this.touchStartX - this.touchEndX;
      const threshold = 50; 
      if (delta > threshold && this.currentPage < this.paginatedCards.length - 1) {
        this.scrollToPage(this.currentPage + 1);
      } else if (delta < -threshold && this.currentPage > 0) {
        this.scrollToPage(this.currentPage - 1);
      }
    },
  },
};
function getMaterialIcon(index) {
  const icons = [
    { icon: "home", title: "Home" },
    { icon: "person", title: "Person" },
    { icon: "search", title: "Search" },
    { icon: "notifications", title: "Notifications" },
    { icon: "settings", title: "Settings" },
    { icon: "message", title: "Message" },
    { icon: "favorite", title: "Favorite" },
    { icon: "folder", title: "Folder" },
    { icon: "star", title: "Star" },
    { icon: "camera", title: "Camera" },
    { icon: "calendar_today", title: "Calendar" },
    { icon: "music_note", title: "Music" },
    { icon: "location_on", title: "Location" },
    { icon: "video_library", title: "Video" },
    { icon: "lock", title: "Lock" },
    { icon: "cloud", title: "Cloud" },
    { icon: "phone", title: "Phone" },
    { icon: "mail", title: "Mail" },
    { icon: "wifi", title: "Wi-Fi" },
    { icon: "bookmark", title: "Bookmark" },
    { icon: "book", title: "Book" },
    { icon: "accessibility", title: "accessibility" },
    { icon: "flash_on", title: "Flash" },
    { icon: "check_circle", title: "Check" },
    { icon: "play_circle", title: "Play" },
    { icon: "description", title: "Description" },
    { icon: "coffee", title: "Coffee" },
    { icon: "compass_calibration", title: "Compass" },
    { icon: "share", title: "Share" },
    { icon: "radio", title: "Radio" },
    { icon: "shopping_cart", title: "Shopping" },
    { icon: "movie", title: "Movie" },
    { icon: "mic", title: "Microphone" },
    { icon: "tablet", title: "Tablet" },
    { icon: "monitor", title: "Monitor" },
    { icon: "camera_alt", title: "Camera Alt" },
    { icon: "volume_up", title: "Volume" },
    { icon: "wb_sunny", title: "Sunny" },
    { icon: "brightness_3", title: "Brightness" },
    { icon: "file_upload", title: "File Upload" },
    { icon: "file_download", title: "File Download" },
    { icon: "error", title: "Error" },
    { icon: "target", title: "Target" },
    { icon: "bar_chart", title: "Bar Chart" },
    { icon: "camera_enhance", title: "Camera Enhance" },
    { icon: "send", title: "Send" },
    { icon: "local_shipping", title: "Shipping" },
    { icon: "wifi_off", title: "Wi-Fi Off" },
    { icon: "map", title: "Map" },
    { icon: "slack", title: "Slack" },
    { icon: "play_arrow", title: "Play Arrow" },
    { icon: "check_box", title: "Check Box" },
    { icon: "alarm", title: "Alarm" },
    { icon: "layers", title: "Layers" },
    { icon: "content_copy", title: "Copy" },
    { icon: "edit", title: "Edit" },
    { icon: "battery_full", title: "Battery Full" },
    { icon: "color_lens", title: "Color Lens" },
  ];
  return icons[index % icons.length];
}
</script>
<style lang="less">
@background-color: black;
@text-color: gold;
@card-background: #222;
@pagination-inactive: gray;

body {
  margin: 0;
  background-color: @background-color;
  color: @text-color;
  font-family: Arial, sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-grid {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;

    .page {
      flex-shrink: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 10px;
        margin: 0 auto;

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 120px; 
          cursor: pointer;
          text-align: center;
          background-color: @card-background;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s;

          &:hover {
            transform: scale(1.1);
          }

          .card-image {
            font-size: 40px;
            margin-bottom: 10px;
          }

          .card-title {
            font-size: 14px;
            color: @text-color;
            margin-top: 5px;
            word-wrap: break-word;
          }
        }
      }
    }
  }

  .pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 5px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: @pagination-inactive;
      transition: background-color 0.3s;
      cursor: pointer;

      &.active {
        background-color: @text-color;
      }
    }
  }
}
</style>
