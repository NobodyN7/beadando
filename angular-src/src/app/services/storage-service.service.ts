import { Injectable } from "@angular/core";

@Injectable()
export class StorageServiceService {
  storage: any;

  constructor() {}

  storeData(data) {
    this.storage = data;
  }

  returnData() {
    return this.storage;
  }
}
