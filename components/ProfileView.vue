<template>
  <v-container>
    <v-card>
      <v-img :src="user.avatarUrl" :alt="user.name" height="200px"></v-img>
      <v-card-title class="headline">{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Birthday:</v-list-item-title>
              <v-list-item-subtitle>{{ user.birthday }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Location:</v-list-item-title>
              <v-list-item-subtitle>{{ user.location }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <!-- Add more user details here -->
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "https://via.placeholder.com/200",
        birthday: "January 1, 1990",
        location: "New York, USA",
        // Add more user details as needed
      },
    };
  },
};
</script>
