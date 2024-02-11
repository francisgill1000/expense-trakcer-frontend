<template>
  <v-container>
    <v-row>
      <v-col v-for="(video, index) in videos" :key="index" cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-sheet height="500">
              <video
                :ref="`myVideo${index}`"
                :id="`myVideo${index}`"
                width="320"
                height="240"
                controls
                @play="handleVideoPlay(index)"
                playsinline
                :src="video.src"
                style="width: 100%; height: 100%"
              ></video>
            </v-sheet>
          </v-card-text>
          <v-toolbar flat>
            <v-card-title>{{ video.name }}</v-card-title>
            <v-spacer></v-spacer>
            {{ video.likeCount }}
            <v-icon :color="video.isLike ? `red` : ''" @click="likeVideo(video)"
              >mdi-heart</v-icon
            >

            {{ video.commentCount }}
            <v-icon
              :color="video.isComment ? `red` : ''"
              @click="commentVideo(video)"
              >mdi-comment-outline</v-icon
            >

            {{ video.shareCount }}
            <v-icon
              :color="video.isShare ? `red` : ''"
              @click="shareVideo(video)"
              >mdi-share-variant</v-icon
            >
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        {
          id: "video1",
          name: "Video 1",
          src: "/video1.mp4",
          isLike: false,
          likeCount:0,
          isComment: false,
          commentCount:0,
          isShare:false,
          shareCount: 0
        },
        {
          id: "video2",
          name: "Video 2",
          src: "/video3.mp4",
          isLike: false,
          likeCount:0,
          isComment: false,
          commentCount:0,
          isShare:false,
          shareCount: 0
        },
      ],
      currentPlaying: null,
    };
  },
  methods: {
    handleVideoPlay(currentIndex) {
      this.videos.forEach((video, index) => {
        if (index !== currentIndex) {
          const otherVideo = this.$refs[`myVideo${index}`][0];
          otherVideo.pause();
        }
      });

      console.log(`Video ${currentIndex + 1} is playing`);
    },
    likeVideo(video) {
      video.isLike = !video.isLike;
      video.isLike ? ++video.likeCount : --video.likeCount;
    },

    commentVideo(video) {
      video.isComment = !video.isComment;
      video.isComment ? ++video.commentCount : --video.commentCount;
    },

    shareVideo(video) {
      video.isShare = !video.isShare;
      video.isShare ? ++video.shareCount : --video.shareCount;
    },
  },
};
</script>
