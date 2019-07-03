import { Injectable } from "@angular/core";

@Injectable()
export class Inventories {
    private list: any = {};
    public targetIventory: String = undefined;

    public windows = [];

    dragging: HTMLElement = undefined;
    targetCell: HTMLElement = undefined;
    item: any = undefined;
    pickedUp = {x: 0,y: 0};
    pickedSize = {x: 0,y: 0};

    private inventories: any = {
        stash: {
            label: 'Stash',
            size: {
                c: 12,
                r: 32
            },
            items: [
                {
                    size: {
                        x: 1,
                        y: 1
                    },
                    invPos: {
                        x: 0,
                        y: 0
                    },
                    type: 'medical',
                    name: 'Bandage',
                    attributes: {
                        health: 20,
                        bleeding: false
                    },
                    context: [
                        {
                            label: "Use"
                        }
                    ],
                    lore: ''
                },
                {
                    size: {
                        x: 1,
                        y: 1
                    },
                    invPos: {
                        x: 1,
                        y: 0
                    },
                    type: 'medical',
                    name: 'Bandage',
                    attributes: {
                        health: 20,
                        bleeding: false
                    },
                    context: [
                        {
                            label: "Use"
                        },
                        {
                            label: "Discard"
                        }
                    ],
                    lore: ''
                },
                {
                    size: {
                        x: 2,
                        y: 1
                    },
                    invPos: {
                        x: 2,
                        y: 0
                    },
                    type: 'knife',
                    name: 'Pocket Knife',
                    icon: 'assets/game_assets/icons/knife.jpg',
                    attributes: {
                        damage: 30,
                        bleeding: true
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 4,
                        y: 2
                    },
                    invPos: {
                        x: 0,
                        y: 1
                    },
                    type: 'gun',
                    name: 'MP5',
                    icon: 'assets/game_assets/icons/mp5.png',
                    attributes: {
                        damage: 30,
                        bleeding: true
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 5,
                        y: 2
                    },
                    invPos: {
                        x: 0,
                        y: 3
                    },
                    type: 'gun',
                    name: 'M4A1',
                    icon: 'assets/game_assets/icons/m4a1.png',
                    attributes: {
                        damage: 30,
                        bleeding: true
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 4,
                        y: 6
                    },
                    invPos: {
                        x: 0,
                        y: 6
                    },
                    type: 'bag',
                    name: 'Scrapper Bag',
                    icon: 'assets/game_assets/icons/bag.png',
                    attributes: {
                        width: 5,
                        height: 6
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 4,
                        y: 6
                    },
                    invPos: {
                        x: 4,
                        y: 6
                    },
                    type: 'bag',
                    name: 'Scrapper Bag',
                    icon: 'assets/game_assets/icons/bag.png',
                    attributes: {
                        width: 5,
                        height: 6
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 4,
                        y: 6
                    },
                    invPos: {
                        x: 8,
                        y: 6
                    },
                    type: 'bag',
                    name: 'Scrapper Bag',
                    icon: 'assets/game_assets/icons/bag.png',
                    attributes: {
                        width: 5,
                        height: 6
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 10,
                        y: 4
                    },
                    invPos: {
                        x: 1,
                        y: 12
                    },
                    type: 'case',
                    name: 'Large Gun Case',
                    icon: 'assets/game_assets/icons/large_gun_case.png',
                    attributes: {
                        width: 12,
                        height: 6,
                        filters: ['gun','magazine','ammo']
                    },
                    lore: ''
                },
                {
                    size: {
                        x: 4,
                        y: 3
                    },
                    invPos: {
                        x: 8,
                        y: 0
                    },
                    type: 'bag',
                    name: 'Duffle Bag',
                    icon: 'assets/game_assets/icons/duffle_bag.png',
                    attributes: {
                        width: 4,
                        height: 4,
                    },
                    lore: ''
                }
            ]
        }
    }

    constructor() { }

    public getInventory(id) {
        return new Promise((res)=>{
            if(this.list[id]) res(this.list[id]);
            else res(false)
        })
    }

    public submitInventory(inventory) {
        this.list[inventory.id] = inventory;
    }

    public loadInventory(id: string) {
        return new Promise((res)=>{
            if(this.inventories[id]) res(this.inventories[id]);
            else res(false);
        })
    }

    public createInventory(options) {
        return new Promise((res)=>{
            this.inventories[options.id] = {
                    label: options.label,
                    size: {
                        c: options.width,
                        r: options.height
                    },
                    filters: options.filters,
                    items: []
            }
            res();
        })
    }

    public closeWindow(id) {
        this.windows.forEach((window, index)=>{
            if(window == id) this.windows.splice(index, 1);
        });
    }

    public saveInventory(inventory, id){
        this.inventories[id] = inventory;
    }

    getId () {
        return new Date().getTime().toString(36).substr(2,9);
    }
}