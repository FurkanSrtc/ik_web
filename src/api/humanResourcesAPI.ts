import http from './http-common';
import { UserObject } from '../types/userTypes';

const GetUsers = async () => {
  const response = await http.get<UserObject[]>(`/users`);
  return response.data;
};

const HumanResourcesAPI = {
  GetUsers
};

export default HumanResourcesAPI;
