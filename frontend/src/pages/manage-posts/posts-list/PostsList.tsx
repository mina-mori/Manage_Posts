import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {deletePost, getPosts} from '../../../services/Posts.service';
import {Post} from '../../../interfaces/post.interface';
import Table, {Column} from '../../../components/shared/table/Table.component';
import ToggleButton from '../../../components/shared/toggle-button/ToggleButton.component';
import Card from '../../../components/shared/card/Card.component';
import {formatDate} from '../../../utils/Date.helper';
import './PostsList.css';
import {Response} from '../../../interfaces/shared.interface';


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
  const [pagesMemoization, setPagesMemoization] = useState<number[]>([]);
  useEffect(() => {
      fetchPosts(defaultCurrentPage, defaultPageSize);
  }, []);
  const fetchPosts = async (page:number, size:number, ignoreMemoization?: boolean) => {
    try {
      if (!pagesMemoization.includes(page) || ignoreMemoization) {
        const response:Response = await getPosts(page, size);
        const postsData = response.data?.posts;
        formatData(postsData)
        setTotalCount(response.data?.totalCount);
        setPagesMemoization(prev => [...prev, page])
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const formatData = async (posts: Post[]) => {
    posts.forEach((post:Post,index: number) => {
        const tableItem = {
          title:post.content, 
          actions: <>
            <button style={{margin:"0 5px 5px 0"}} onClick={() => history.push(`details/${post._id}`)}>Details</button>
            <button style={{margin:"0 5px 5px 0"}} onClick={() => history.push(`edit/${post._id}`)}>Edit</button>
            <button style={{margin:"0 5px 5px 0"}} onClick={() =>post?._id && handleDeletePost(post._id, index)}>Delete</button>
          </>
        };
        setTableData((items:any) => [...items, tableItem]);
        const createdAt = post.createdAt ? formatDate(new Date(post.createdAt)): undefined;
        const cardItem = {
          title: post.content, 
          body: <>
            <div className='trim-text' title={post.createdBy}><b>Created By</b>: {post.createdBy}</div>
            <div className='trim-text' title={createdAt}><b>Created At</b>: {createdAt}</div>
          </>,
          actions: [
            {label:'Details', onClick:() => history.push(`details/${post._id}`) },
            {label:'Edit', onClick:() => history.push(`edit/${post._id}`) },
            {label:'Delete', onClick:() => post._id && handleDeletePost(post._id, index) },
          ]
        };
        setCardsData((items:any) => [...items, cardItem]);
    });
  }
  const handleToggle = (isChecked: boolean) => {
    setDataShowInCards(isChecked);
    resetData();
    fetchPosts(defaultCurrentPage, defaultPageSize,true);
    localStorage.setItem('display_mode', isChecked? 'card':'table');
  };
  const handleDeletePost = async (postId:string, index: number) => {
    try {
      await deletePost(postId);
      alert('The post is deleted successfully.');
      resetData();
      fetchPosts(defaultCurrentPage, defaultPageSize, true);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleLoadMore = async (page:number) => {
    setCurrentPage(page);
    fetchPosts(page, defaultPageSize);
  }
  const resetData = () => {
    setPagesMemoization([]);
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
            <Table columns={tableColumns} data={tableData} totalCount={totalCount} pageSize={defaultPageSize} page={currentPage} onPageChange={handleLoadMore}></Table>
          }
        </>
      )}
    </div>
  );
};

export default PostList;
