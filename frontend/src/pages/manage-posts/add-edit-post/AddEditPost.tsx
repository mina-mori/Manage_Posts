import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {createPost, getPostById, updatePost} from '../../../services/Posts.service';
import {Post} from '../../../interfaces/post.interface';
import './AddEditPost.css';
import {Response} from '../../../interfaces/shared.interface';

const initialFormData: Post = {
  _id: undefined,
  content: '',
};

const AddEditPost: React.FC = () => {
  const history = useHistory();
  const {postId} = useParams<{ postId: string }>();
  const [formData, setFormData] = useState<Post>(initialFormData);

  useEffect(() => {
    if (postId) {
      const getPost = async () => { 
        const response: Response = await getPostById(postId);
        debugger
        const post = response.data;
        setFormData({_id:post._id, content: post.content });
      }
      getPost() ;
    } else {
      setFormData(initialFormData);
    }
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      postId ? await updatePost(formData) : await createPost(formData);
      alert(`The post is ${postId ? 'edited' : 'added'} successfully`)
      history.push('/');
    } catch (error) {
      alert('something went wront')
    }
  };
  return (
    <div className="post-form">
    <h2>{postId ? 'Edit Post' : 'Create Post'}</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>content</label>
        <input type="text" name="content" value={formData.content} onChange={handleChange} minLength={1} required />
      </div>
      <button type="submit">{postId ? 'Update Post' : 'Create Post'}</button>
    </form>
  </div>
  );
};

export default AddEditPost;
