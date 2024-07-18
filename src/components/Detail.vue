<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div class="post-detail-container">
      <div class="post-content">
        <div class="post">
          <h1>{{ post.title }}</h1>
          <p>{{ post.body }}</p>
        </div>
        <h2>Comments:</h2>
        <div>
                  <input
                    type="text" placeholder="Search comment by author or title"
                    v-model="searchComment"
                  />
        </div>
        <ul class="comments-list">
          <li v-for="comment in filteredComments" :key="comment.id" class="comment-item">
            <h3> {{ comment.id }}, {{ comment.name }}</h3>
            <p>{{ comment.body }}</p>
            <p><strong>By:</strong> {{ comment.email }}</p>
          </li>
        </ul>
      </div>
      <div class="user-details">
        <h2>Posted by:</h2>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Website:</strong> <a :href="user.website">{{ user.website }}</a></p>
        <p><strong>Company:</strong> {{ user.company?.name }}</p>
        <p><strong>Address:</strong> {{ user.address?.street }}, {{ user.address?.suite }}, {{ user.address?.city }}, {{ user.address?.zipcode }}, [{{ user.address?.geo?.lat }}, {{ user.address?.geo?.lng }}]</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Detail',
  props: ['id'],
  data() {
    return {
      post: {},
      comments: [],
      user: {},
      loading: true,
      searchComment: ''
    };
  },
  computed: {
      filteredComments(){
        if (!this.searchComment){
          return this.comments
        }
        return this.comments.filter(comment =>
          (comment.email.toLowerCase().includes(this.searchComment.toLowerCase()) || comment.name.toLowerCase().includes(this.searchComment.toLowerCase()))
        )
      }
    },
  async created() {
    try {
      const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
      this.post = postResponse.data;

      const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`);
      this.comments = commentsResponse.data;

      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${this.post.userId}`);
      this.user = userResponse.data;
      

      this.loading = false;
    } catch (error) {
      console.error('Error fetching post details:', error);
      this.loading = false;  // Ensure loading is set to false even if there is an error
    }
  },
};
</script>

<style>
.post-detail-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.post-content {
  flex: 2;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  margin-right: 2px;
}

.user-details {
  flex: 1;
  border: 1px solid #ccc;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comments-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-item h3 {
  margin-bottom: 5px;
}

.comment-item p {
  margin-bottom: 10px;
}
.post {
  background-color: #76f1c2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
}
</style>

