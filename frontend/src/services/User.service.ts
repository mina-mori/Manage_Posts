import environment from '../environments/environment';
import {ApiInterceptor} from '../utils/Api.interceptor';

const ApiInterceptorSingleton = ApiInterceptor.getInstance();
export const login = async (email:string, password:string) => {
    return await ApiInterceptorSingleton.postData(`${environment.baseUrl}/auth/login`, { email, password });
};
export const register = async (email:string, password:string) => {
    return await ApiInterceptorSingleton.postData(`${environment.baseUrl}/users/register`, { email, password });
};
