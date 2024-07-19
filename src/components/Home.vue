<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="container">
        <h1 class="heading">Posts of all users</h1>
        <div>
          <input
            type="text"
            placeholder="Search by author or title"
            v-model="searchQuery"
          />
          <button @click="toggleSort">
            Sort by {{ sortBy === 'title' ? 'ID' : 'Title' }}
          </button>
        </div>
        <ul class="post-list">
          <li v-for="post in filteredPosts" :key="post.id" class="post-item">
            <h2 class="post-title">
              <router-link :to="`/post/${post.id}`">{{post.id}}. {{ post.title }}</router-link>
            </h2>
            <p class="post-body">{{ post.body }}</p>
            <p class="post-author"><strong>By:</strong> {{ post.userName }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      loading: true,
      searchQuery: '',
      sortBy: 'title', // default sort by title
    };
  },
  computed: {
    filteredPosts() {
      let sortedPosts = [...this.posts];
      if (this.sortBy === 'title') {
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'id') {
        sortedPosts.sort((a, b) => a.id - b.id);
      }
      if (!this.searchQuery) {
        return sortedPosts;
      }
      return sortedPosts.filter(
        (post) =>
          post.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    toggleSort() {
      this.sortBy = this.sortBy === 'title' ? 'id' : 'title';
    },
  },
  async created() {
    try {
      const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const posts = postResponse.data;

      const usersPromises = posts.map((post) =>
        axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      );
      const usersResponses = await Promise.all(usersPromises);

      const users = usersResponses.map((response) => response.data);

      this.posts = posts.map((post) => ({
        ...post,
        userName: users.find((user) => user.id === post.userId).name,
      }));
      this.loading = false;
    } catch (error) {
      console.error('Error fetching posts or users:', error);
    }
  },
};
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
}

.post-list {
  list-style-type: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  margin-bottom: 10px;
}

.post-body {
  line-height: 1.6;
}

.post-author {
  font-style: italic;
  color: #666;
}

.heading{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

  