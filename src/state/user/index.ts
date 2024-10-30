import { FILTERACCOUNTS, MobileUserDatas, UserRole } from '@/Constants/Type';
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

export const SearchUserTypeSelected = atom({
  key: 'SearchUserTypeSelected',
  default: UserRole.ADMIN_PARC,
});

export const ProfileFilterSelected = atom({
  key: 'ProfileFilterSelected',
  default: 0,
});

// Client Datas
export const ClientUsers = atom({
  key: 'ClientUsers',
  default: [] as MobileUserDatas[],
});

// Client Datas
export const DealersUses = atom({
  key: 'DealersUses',
  default: [] as MobileUserDatas[],
});

//Filter datas
export const ClientUsersFiltered = atom({
  key: 'ClientUsersFiltered',
  default: [] as MobileUserDatas[],
});

// Client Datas
export const DealersUsesFiltered = atom({
  key: 'DealersUsesFiltered',
  default: [] as MobileUserDatas[],
});

// Client Datas
export const ResultSearchDatas = atom({
  key: 'ResultSearchDatas',
  default: [] as MobileUserDatas[],
});