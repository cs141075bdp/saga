import * as paths from '../../utils/paths';
import { loadJSON, saveJSON } from '../modules/jsonStorage';
import { TRecordMacrosInformation, TRecordMacros } from './models';

const fs = require('fs');

const RECORDS_SUB_PATH = './storage/records/';
const RECORDS_PATH = paths.resolve(RECORDS_SUB_PATH);

class RecordsStorage {
  private isChangeFiles: boolean = false;

  private files: string[] = [];

  private macrosesInfo: Array<TRecordMacrosInformation> = [];

  constructor() {
    this.getRecords();
  }

  findFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(RECORDS_PATH, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          reject(new Error(`Unable to scan directory: ${err}`));

          return console.log(`Unable to scan directory: ${err}`);
        }

        this.files = files;

        resolve(files);
      });
    });
  }

  async getRecords(): Promise<Array<TRecordMacrosInformation>> {
    return this.findFiles().then((values): Array<TRecordMacrosInformation> => {
      this.macrosesInfo = Array<TRecordMacrosInformation>(0);

      for (const file of values) {
        const filePath = paths.resolve(`${RECORDS_SUB_PATH}${file}`);
        const macroses = loadJSON(filePath) as Array<TRecordMacros>;

        for (const macros of macroses) {
          this.macrosesInfo.push({
            id: macros.id,
            description: macros.description,
            macros: macros.macros,
            file,
          });
        }
      }

      return this.macrosesInfo;
    });
  }

  getInfoById(id: number): TRecordMacrosInformation | null {
    const info = this.macrosesInfo.find(item => item.id === id);

    if (!info) {
      return null;
    }

    return info;
  }

  getById(id: number): TRecordMacros {
    const info = this.macrosesInfo.find(item => item.id === id);

    if (!info) {
      throw new Error(`Macros with id ${id} not found`);
    }

    const macroses = this.getFile(info.file);
    const macros = macroses.find(item => item.id === id);

    if (!macros) {
      throw new Error(`Macros with id ${id} not found in file`);
    }

    return macros;
  }

  getByName(name: string): TRecordMacros {
    const info = this.macrosesInfo.find(item => item.macros === name);

    if (!info) {
      throw new Error(`Macros with name ${name} not found`);
    }

    const macroses = this.getFile(info.file);
    const macros = macroses.find(item => item.macros === name);

    if (!macros) {
      throw new Error(`Macros with name ${name} not found in file`);
    }

    return macros;
  }

  getByLongName(name: string): TRecordMacros {
    const i = name.indexOf('.');
    const fileName = name.substr(0, i);
    const macrosName = name.substr(i + 1);
    const macroses = this.getFile(fileName);
    const macros = macroses.find(item => item.macros === macrosName);

    if (!macros) {
      throw new Error(`Macros with name ${macrosName} not found in file ${fileName}`);
    }

    return macros;
  }

  getFile(fileName: string): Array<TRecordMacros> {
    const filePath = paths.resolve(`${RECORDS_SUB_PATH}${fileName}`);

    return loadJSON(filePath) as Array<TRecordMacros>;
  }

  saveFile(fileName: string, values: Array<TRecordMacros>): void {
    const filePath = paths.resolve(`${RECORDS_SUB_PATH}${fileName}`);

    saveJSON(filePath, values);
  }

  remove(id: number): TRecordMacros {
    const info = this.getInfoById(id);

    if (!info) {
      throw new Error(`Macros with id ${id} not found`);
    }

    const macroses = this.getFile(info.file);
    const macros = macroses.find(item => item.id === id);

    if (!macros) {
      throw new Error(`Macros with id ${id} not found in file`);
    }

    this.saveFile(info.file, macroses.filter(item => item.id !== id));

    return macros;
  }

  append(fileName: string, value: TRecordMacros): void {
    const macroses = this.getFile(fileName);
    macroses.push(value);
    this.saveFile(fileName, macroses);
  }

  move(id: number, fileName: string) {
    const info = this.getInfoById(id);

    if (!info) {
      throw new Error(`Macros with id ${id} not found`);
    }

    const macros = this.remove(id);
    this.append(fileName, macros);
  }
}

export default new RecordsStorage();
