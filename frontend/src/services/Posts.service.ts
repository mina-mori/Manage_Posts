import environment from '../environments/environment';
import { Post } from '../interfaces/post.interface';
import {Response} from '../interfaces/shared.interface';
import {ApiInterceptor} from '../utils/Api.interceptor';

const ApiInterceptorSingleton = ApiInterceptor.getInstance();
export const getPosts = async (page:number, pageSize:number): Promise<Response> => {
  return await ApiInterceptorSingleton.getData(`${environment.baseUrl}/posts?page=${page}&perPage=${pageSize}`);
};

export const getPostById = async (postId: string): Promise<Response> => {
  return await ApiInterceptorSingleton.getData(`${environment.baseUrl}/posts/${postId}`);
};

export const createPost = async (postData: Post): Promise<void> => {
  return await ApiInterceptorSingleton.postData(`${environment.baseUrl}/posts`,postData);
};
export const updatePost = async (postData: Post): Promise<void> => {
  return await ApiInterceptorSingleton.putData(`${environment.baseUrl}/posts/${postData._id}`, postData);
};

export const deletePost = async (postId: string): Promise<void> => {
  return await ApiInterceptorSingleton.deleteData(`${environment.baseUrl}/posts/${postId}`);
};
