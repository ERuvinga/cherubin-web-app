import { LocalUserData, STORAGEKEYS } from '@/Constants/Type';

// create class to get and set value secure KeyStore
export class LocalStorage {
  private secureStore;
  constructor() {
    this.secureStore = window.localStorage;
  }
  //private Methode
  public setAllDatas = (datas: {
    email: string;
    fName: string;
    lName: string;
    isActive: string;
    cover: string;
    idUser: string;
  }) => {
    this.secureStore.setItem(STORAGEKEYS.EMAIL, datas.email); //Save Datas of User
    this.secureStore.setItem(STORAGEKEYS.FIRSTNAME, datas.fName);
    this.secureStore.setItem(STORAGEKEYS.LASTNAME, datas.lName);
    this.secureStore.setItem(STORAGEKEYS.STATUS, datas.isActive);
    this.secureStore.setItem(STORAGEKEYS.PROFILEUSER, datas.cover);
    this.secureStore.setItem(STORAGEKEYS.IDUSER, datas.idUser);
  };

  public deleteAllData = () => {
    this.secureStore.deleteItemAsync(STORAGEKEYS.EMAIL); // Delete All datas
    this.secureStore.deleteItemAsync(STORAGEKEYS.FIRSTNAME);
    this.secureStore.deleteItemAsync(STORAGEKEYS.LASTNAME);
    this.secureStore.deleteItemAsync(STORAGEKEYS.STATUS);
    this.secureStore.deleteItemAsync(STORAGEKEYS.PROFILEUSER);
    this.secureStore.deleteItemAsync(STORAGEKEYS.IDUSER);
  };

  //publics Methodes
  public getName = () => {
    return `${this.secureStore.getItem(STORAGEKEYS.FIRSTNAME)} ${this.secureStore.getItem(STORAGEKEYS.LASTNAME)}`; // get names
  };

  public getEmail = () => {
    return this.secureStore.getItem(STORAGEKEYS.EMAIL); // get email
  };
  public getImage = () => {
    return this.secureStore.getItem(STORAGEKEYS.PROFILEUSER); // get ImageUser
  };

  public getIdUser = () => {
    return this.secureStore.getItem(STORAGEKEYS.IDUSER); // get Id
  };

  public getStatusUser = () => {
    return this.secureStore.getItem(STORAGEKEYS.STATUS); // get Account User status
  };

  public getAllDatas = () => {
    return {
      cover: this.secureStore.getItem(STORAGEKEYS.PROFILEUSER),
      _id: this.secureStore.getItem(STORAGEKEYS.IDUSER),
      email: this.secureStore.getItem(STORAGEKEYS.EMAIL),
      name: this.secureStore.getItem(STORAGEKEYS.FIRSTNAME),
      isActive: this.secureStore.getItem(STORAGEKEYS.STATUS),
    } as LocalUserData;
  };
}

const useLocalStorage = () => {
  return new LocalStorage();
};

export default useLocalStorage;
