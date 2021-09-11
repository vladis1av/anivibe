export interface TorrentsProps {
  list: TorrentListItems;
}

interface TorrentListItems {
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
