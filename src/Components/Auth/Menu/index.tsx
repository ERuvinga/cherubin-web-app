//import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//components
import {
  UserGroupIcon as OutlineClients,
  MagnifyingGlassIcon as SolidSearch,
  PlusCircleIcon as OutlinePlus,
  UserIcon as OutlineUser,
} from '@heroicons/react/24/outline';
import {
  UserGroupIcon as SolidClients,
  MagnifyingGlassIcon as OutlineSearch,
  PlusCircleIcon as SolidPlus,
  UserIcon as SolidUser,
} from '@heroicons/react/24/solid';

//Recoil and Atoms
import { useRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';

//Types and styles
import Styles from '@/Components/Auth/Menu/Menu.module.css';
import { NavBarIcons } from '@/Constants/Type';
import { MenuTab } from '@/Constants/TabListDatas';

const HomeMenu = () => {
  const [itemMenuSelctedValue, setitemMenuSelctedValue] =
    useRecoilState(itemMenuSelected);

  //updated itemSelected function
  const itemUpdated = (itemValue: number) => {
    setitemMenuSelctedValue(itemValue);
    // resets States
  };

  const DecodeIcone = (IconeCode: NavBarIcons, idItem: number) => {
    switch (IconeCode) {
      case NavBarIcons.USER: {
        return itemMenuSelctedValue == idItem ? (
          <SolidClients width={25} height={25} color="#227ABD" />
        ) : (
          <OutlineClients width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.DEALER: {
        return itemMenuSelctedValue == idItem ? (
          <SolidUser width={25} height={25} color="#227ABD" />
        ) : (
          <OutlineUser width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.SEARCH: {
        return itemMenuSelctedValue == idItem ? (
          <SolidSearch width={25} height={25} color="#227ABD" />
        ) : (
          <OutlineSearch width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.NEW: {
        return itemMenuSelctedValue == idItem ? (
          <SolidPlus width={25} height={25} color="#227ABD" />
        ) : (
          <OutlinePlus width={25} height={25} color="#7a7979" />
        );
      }
    }
  };

  return (
    <div className={`${Styles.ContainerMenu}`}>
      <div className={`${Styles.AuthUserDatas}`}>
        <Image
          className={Styles.MenuProfileImage}
          src={'/logo.png'}
          width={500}
          height={500}
          alt="profilImage"
        />
        <span className={`${Styles.logoName}`}>SMART METER</span>
      </div>
      <div className={`${Styles.MenuList}`}>
        {MenuTab.map((value, index) => (
          <Link
            onClick={() => itemUpdated(index)}
            key={`${value.label}_${index}`}
            href={value.route}
            className={`${Styles.Item}`}
          >
            <>{DecodeIcone(value.icone, index)}</>
            <span
              className={
                index == itemMenuSelctedValue
                  ? `${Styles.ItemListSelected}`
                  : `${Styles.ItemList}`
              }
            >
              {value.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeMenu;
