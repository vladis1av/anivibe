export interface ITorrents {
  list: ITorrentListItems[];
}

export interface ITorrentListItems {
  torrent_id: number;
  total_size: number;
  uploaded_timestamp: number;
  downloads: number;
  leechers: number;
  seeders: number;
  url: string;
  series: {
    string: string;
  };
  quality: {
    string: string;
  };
}
