import { post } from '@/api/exampleApi';

const User = {
  login(phone: number, password: number) {
    return post('/login/cellphone', { phone, password });
  },
};

export default User;
