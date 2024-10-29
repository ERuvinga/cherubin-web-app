import {
  AppointmentDatas,
  CommentDatas,
  FILTERACCOUNTS,
  PostWithCommentsDatas,
} from '@/Constants/Type';
import { atom } from 'recoil';

export const PlatformInfo = atom({
  key: 'PlatformInfo',
  default: '',
});

//Filter datas
export const HomeFilterSelected = atom({
  key: 'HomeFilterSelected',
  default: FILTERACCOUNTS.ALL,
});

export const ProfileFilterSelected = atom({
  key: 'ProfileFilterSelected',
  default: 0,
});

// Select Datas
export const PostSelected = atom({
  key: 'PostSelected',
  default: {} as PostWithCommentsDatas,
});

export const PostWithoutLikesSelected = atom({
  key: 'PostWithoutLikesSelected',
  default: {} as PostWithCommentsDatas,
});

export const CommentSelected = atom({
  key: 'CommentSelected',
  default: {} as CommentDatas,
});

//Meeting States
export const MeetingSelected = atom({
  key: 'MeetingSelected',
  default: {} as AppointmentDatas,
});

// Loader Home Pages datas
export const ForumsLoader = atom({
  key: 'ForumsLoader',
  default: true,
});

export const DebatesLoader = atom({
  key: 'DebatesLoader',
  default: true,
});
export const PollsLoader = atom({
  key: 'PollsLoader',
  default: true,
});
export const MeetingLoader = atom({
  key: 'MeetingLoader',
  default: true,
});
