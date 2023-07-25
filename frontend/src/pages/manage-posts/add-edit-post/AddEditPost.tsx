import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {createPost, getPostById, updatePost} from '../../../services/Posts.service';
import {Post} from '../../../interfaces/post.interface';
import {Response} from '../../../interfaces/shared.interface';
import Modal from '../../../components/shared/modal/Modal.component';
import './AddEditPost.css';

const initialFormData: Post = {
  _id: undefined,
  content: '',
};

const AddEditPost: React.FC = () => {
  const {postId} = useParams<{ postId: string }>();
  const [formData, setFormData] = useState<Post>(initialFormData);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

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
      setPopupMessage(`The post is ${postId ? 'edited' : 'added'} successfully`);
      setShowPopup(true);
      setFormData(initialFormData);
    } catch (error) {
      setPopupMessage('something went wront');
      setShowPopup(true);
    }
  };
  return (
    <>
      <div className="post-form">
        <h2>{postId ? 'Edit Post' : 'Create Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Content</label>
            <input type="text" name="content" value={formData.content} onChange={handleChange} minLength={1} required />
          </div>
          <button type="submit">{postId ? 'Update Post' : 'Create Post'}</button>
        </form>
        <Modal isOpen={showPopup} onClose={()=> setShowPopup(false)}>
            <> 
              <h3>Message</h3>
              <p>{popupMessage}</p>
              <hr></hr>
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </>
        </Modal>
      </div>
    </>
  );
};

export default AddEditPost;
