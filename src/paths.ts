const paths = {
  home() {
    return "/";
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(postSlug: string) {
    return `/topics/${postSlug}/posts/new`;
  },
  postShow(postShowSlug: string, postId: string) {
    return `/topics/${postShowSlug}/posts/${postId}`;
  },
};
export default paths;
