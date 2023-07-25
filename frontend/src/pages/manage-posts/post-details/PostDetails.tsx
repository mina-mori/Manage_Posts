import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Post} from '../../../interfaces/post.interface';
import {Response} from '../../../interfaces/shared.interface';
import {getPostById} from '../../../services/Posts.service';
import {formatDate} from '../../../utils/Date.helper';
import './PostDetails.css'; 

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post>({
    content:'',
  });

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response: Response = await getPostById(postId);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  return (
    <div className="post-detail">
      <h2>Post Details</h2>
      <p><b>Content:</b> {post.content}</p>
      <p><b>Created by:</b> {post.createdBy}</p>
      <p><b>Create at:</b> {post.createdAt ? formatDate(new Date(post.createdAt)): undefined}</p>
    </div>
  );
};

export default PostDetail;
