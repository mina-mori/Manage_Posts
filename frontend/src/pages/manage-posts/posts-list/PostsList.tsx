import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {deletePost, getPosts} from '../../../services/Posts.service';
import {Post} from '../../../interfaces/post.interface';
import Table, {Column} from '../../../components/shared/table/Table.component';
import ToggleButton from '../../../components/shared/toggle-button/ToggleButton.component';
import Card from '../../../components/shared/card/Card.component';
import {formatDate} from '../../../utils/Date.helper';
import {Response} from '../../../interfaces/shared.interface';
import Modal from '../../../components/shared/modal/Modal.component';
import './PostsList.css';
import {JSX} from 'react/jsx-runtime';


const PostList: React.FC = () => {
  const history = useHistory();
  const defaultCurrentPage = 1;
  const defaultPageSize = 5;
  const tableColumns: Column[] = [
    { key: 'title', title: 'Title' },
    { key: 'actions', title: 'Actions' },
  ]
  const [tableData, setTableData] = useState<any>([]);
  const [cardsData, setCardsData] = useState<any>([]);
  const [showDataInCards, setDataShowInCards] = useState<boolean>(localStorage.getItem('display_mode') === 'card' ? true : false);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [totalCount, setTotalCount] = useState(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  useEffect(() => {
      fetchPosts(defaultCurrentPage, defaultPageSize);
  }, []);
  const fetchPosts = async (page:number, size:number) => {
    try {
      const response:Response = await getPosts(page, size);
      const postsData = response.data?.posts;
      formatData(postsData);
      setTotalCount(response.data?.totalCount);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const formatData = (posts: Post[]) => {
    const _tableData: {title: string; actions: JSX.Element;}[] = [];
    const _cardData: {title: string; body: JSX.Element; actions: {label: string; onClick: () => void;}[];}[] = [];
    for(let i = 0; i < posts.length; i++) {
        const tableItem = {
          title:posts[i].content, 
          actions: <>
            <button style={{margin:"0 5px 5px 0"}} onClick={() => history.push(`details/${posts[i]._id}`)}>Details</button>
            <button style={{margin:"0 5px 5px 0"}} onClick={() => history.push(`edit/${posts[i]._id}`)}>Edit</button>
            <button style={{margin:"0 5px 5px 0"}} onClick={() => posts[i] && posts[i]._id && handleDeletePost(posts[i]._id??'', i)}>Delete</button>
          </>
        };
        _tableData.push(tableItem);
        const createdAt = posts[i].createdAt ? formatDate(new Date(posts[i].createdAt??'')): undefined;
        const cardItem = {
          title: posts[i].content, 
          body: <>
            <div className='trim-text' title={posts[i].createdBy}><b>Created By</b>: {posts[i].createdBy}</div>
            <div className='trim-text' title={createdAt}><b>Created At</b>: {createdAt}</div>
          </>,
          actions: [
            {label:'Details', onClick:() => history.push(`details/${posts[i]._id}`) },
            {label:'Edit', onClick:() => history.push(`edit/${posts[i]._id}`) },
            {label:'Delete', onClick:() => posts[i]._id && handleDeletePost(posts[i]._id?? '', i) },
          ]
        };
        _cardData.push(cardItem);;
    }
    setTableData((prev:any) => [...prev, ..._tableData])
    setCardsData((prev:any) => [...prev, ..._cardData])
  }
  const handleToggle = (isChecked: boolean) => {
    setDataShowInCards(isChecked);
    resetData();
    fetchPosts(defaultCurrentPage, defaultPageSize);
    localStorage.setItem('display_mode', isChecked? 'card':'table');
  };
  const handleDeletePost = async (postId:string, index: number) => {
    try {
      await deletePost(postId);
      setPopupMessage('The post is deleted successfully.');
      setShowPopup(true);
      resetData();
      fetchPosts(defaultCurrentPage, defaultPageSize);
    } catch (error) {
      setPopupMessage('Something went wrong!');
      setShowPopup(true);
      console.error('Error deleting post:', error);
    }
  };
  const handleLoadMore = async (page:number) => {
    setTableData([]);
    setCurrentPage(page);
    fetchPosts(page, defaultPageSize);
  }
  const resetData = () => {
    setCardsData([]);
    setTableData([]);
    setCurrentPage(1);
  }
  return (
    <div className='posts-list'>
      <h2>Posts List</h2>
      {cardsData.length === 0 && tableData.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <>
          <div className='posts-toggle-btn'>
            Display in cards mode&nbsp;<ToggleButton onToggle={handleToggle} defaultChecked={showDataInCards} />
          </div>
          {showDataInCards?
            <div className='cards'>
              {cardsData.map((item:any,index:number) => (
                <Card key={index} className='card-item' title={item.title} body={item.body} actionButtons={item.actions}></Card>
              ))}
              <div style={{textAlign: 'center', width: '100%'}}>
                {totalCount > 1 &&
                    currentPage <
                      Math.ceil(totalCount / defaultPageSize) &&  <button onClick={() => handleLoadMore(currentPage + 1)}>Load More</button>}
              </div>
            </div>:
            <Table columns={tableColumns} data={tableData} totalCount={totalCount} pageSize={defaultPageSize} onPageChange={handleLoadMore}></Table>
          }
        </>
      )}
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
  );
};

export default PostList;
