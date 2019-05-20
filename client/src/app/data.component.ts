import { NgZone } from '@angular/core';
import { DirtyService } from './services/dirty.service';



export class DataComponent {
    constructor(public _ngZone: NgZone, public dirtyService?: DirtyService) { }
    DataController: any;
    displayModalNew: string;
    items: any[];
    item: any;
    updateItemRunning: boolean;
    query: any;
    collectionName: string;

    async closeSlider() {
        this._ngZone.run(async () => {
            this.displayModalNew = 'closing';
        });
    }
    beforeUpdate(item) {

    }

    afterUpdate(item) {

    }

    clearMeta() {

        Object.keys(this.item).forEach((key) => {
            if (key.indexOf('_meta_') === 0) {
                delete this.item[key];
            }
        });
    }

    async saveProxy() {
        if (this.item._id) {
            await this.updateItem();
        } else {
            await this.createItem();
        }
    }


    async updateItem() {
        this.clearMeta();
        this.beforeUpdate(this.item);
        this.updateItemRunning = true;
        this.item.Date = new Date();

        await this.DataController.update(this.collectionName, this.item._id, this.item);
        if (this.dirtyService) {
            this.dirtyService.clearDirty();
        }
        this.afterUpdate(this.item);
        this.displayModalNew = '';
        setTimeout(() => {
            this.updateItemRunning = false;
        }, 500);
    }
    async loadItems(query = {}) {
        this.query = {};
        if (Object.keys(query).length) {
            this.query = query;
        }

        this.items = await this.DataController.query(this.collectionName, this.query);
    }

    async deleteItem(item) {
        if (confirm(`Are you sure?`)) {
            await this.DataController.delete(this.collectionName, item._id);
            this.loadItems();
        }
    }
    async createItem() {

        this.clearMeta();
        this.beforeUpdate(this.item);
        this.item = await this.DataController.create(this.collectionName, this.item);
        if (this.dirtyService) {
            this.dirtyService.clearDirty();
        }
        await this.loadItems();
        this.displayModalNew = '';
        this.afterUpdate(this.item);
    }

    newItem() {
        this.item = {} as any;
        this.displayModalNew = 'active';
    }


    editItem(item?: any) {
        this._ngZone.run(async () => {
            if (item) {
                this.item = item;
            } else {
                this.item = {} as any;
            }
            this.displayModalNew = 'active';
        });
    }
}
