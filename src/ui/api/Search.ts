import { get } from '@/api/exampleApi';

const Search = {
  hotMusic() {
    return get('/search/hot/detail');
  },
};

export default Search;
