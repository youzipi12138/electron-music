import { get } from '@/api/exampleApi';

/**
 * song 单曲
 */
export enum SearchType {
  SONG = 1,
  PLAYLIST = 1000,
  ARTIST = 100,
  USER = 1002,
  ALBUM = 10, //专辑
}

export type Artist = {
  name: string;
  img1v1Url?: string;
};

export type Album = {
  artist: Artist;
};

export type Song = {
  name: string;
  artists: Artist[];
  album: Album;
};

export type SearchSingleMusicResponse = {
  code: number;
  trp: [];
  result: {
    songs: Song[];
    songCount: number;
    hasMore: boolean;
  };
};

export interface Playlist {
  coverImgUrl: string;
  creator: {
    nickname: string;
    userId: number;
  };
  playCount: number;
  name: string;
}
export interface SearchPlaylistResponse {
  code: number;
  result: {
    hasMore: boolean;
    hlWords: string[];
    playlistCount: number;
    playlists: Playlist[];
    searchQcReminder: unknown;
  };
}
export interface Singer {
  name: string;
  picUrl: string;
  albumSize: number;
}
export interface SearchArtistResponse {
  result: {
    hasMore: boolean;
    artistCount: number;
    hlWords: string[];
    artists: Singer[];
  };
  code: number;
}
export interface Userprofile {
  userId: number;
  nickname: string;
  signature: string;
  avatarUrl: string;
}
export interface SearchUserResponse {
  result: {
    hasMore: boolean;
    hlWords: string[];
    useprofileCount: number;
    userprofiles: Userprofile[];
  };
  code: number;
}
export interface AlbumItem {
  id: number;
  name: string;
  blurPicUrl: string;
  publishTime: number;
  artist: {
    name: string;
  };
}
export interface SearchAlbumResponse {
  result: {
    hasMore: boolean;
    hlWords: string[];
    albumCount: number;
    albums: AlbumItem[];
  };
  code: number;
}
export interface SearchSuggestionItem {
  keyword: string;
  type: number;
  alg: string;
  lastKeyword: string;
  feature: string;
}
export interface SearchSuggestionResponse {
  code: number;
  result: {
    allMatch: SearchSuggestionItem[];
  };
}

const SearchApi = {
  hotMusic() {
    return get('/search/hot/detail');
  },
  search(keywords: string, type: SearchType, limit = 30, offset = 0) {
    return get<SearchSingleMusicResponse>('/search', {
      keywords,
      type,
      limit,
      offset,
    });
  },
  searchPlaylist(keywords: string, limit = 30, offset = 0) {
    return get<SearchPlaylistResponse>('/search', {
      keywords,
      type: SearchType.PLAYLIST,
      limit,
      offset,
    });
  },
  searchArtist(keywords: string, limit = 30, offset = 0) {
    return get<SearchArtistResponse>('/search', {
      keywords,
      type: SearchType.ARTIST,
      limit,
      offset,
    });
  },
  searchUser(keywords: string, limit = 30, offset = 0) {
    return get<SearchUserResponse>('/search', {
      keywords,
      type: SearchType.USER,
      limit,
      offset,
    });
  },
  searchAlbum(keywords: string, limit = 30, offset = 0) {
    return get<SearchAlbumResponse>('/search', {
      keywords,
      type: SearchType.ALBUM,
      limit,
      offset,
    });
  },
  searchSuccess(keywords: string) {
    return get<SearchSuggestionResponse>('/search/suggest', {
      keywords,
      type: 'mobile' as const,
    });
  },
};

export default SearchApi;
