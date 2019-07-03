export function Item () {

    this.init = (options) => {
        return new Promise((res)=>{
            // set properties
            Object.keys(options).forEach((key)=>{this[key] = options[key]});
            // generate new id if new item
            if(!this.id){this.id = this.getId();}

            // create html element
            this.createElement();
            res(this.id);
        });
    }

    this.createElement = () => {
        let item = document.createElement('div');
        item.setAttribute('draggable', 'true');
        item.id = this.id;
        item.style.width = this.getSize(this.size.x) + 'px';
        item.style.height = this.getSize(this.size.y) + 'px';
        item.classList.add('item');

        if(this.icon){
            item.style.backgroundImage = `url(${this.icon})`;
        }

        this.element = item;
        
        this.getTypeFunctionallity()

        // this.items.push(item);
        // this.cells[index].appendChild(item);
    }

    this.save = () => {
        // return savable object
        return {
            id: this.id,
            size: this.size,
            invPos: this.invPos,
            icon: this.icon,
            type: this.type,
            name: this.name,
            attributes: this.attributes,
            lore: this.lore
        };
    }

    this.getSize = (num) => {
        return (30 * num) + (2 * (num - 1)) 
    }

    this.getId = () => {
        return (new Date().getTime()+Math.random()*100).toString(36).substr(2,9);
    }

    this.getTypeFunctionallity = () => {
        // load item functionallity

        if(this.type == 'bag' || this.type == "case"){
            // load listeners
            
                this.element.ondblclick  = () => {
                    // on double click if window not open load inventory
                    if(this.inventories.windows.indexOf(this.id) == -1){
                        this.inventories.loadInventory(this.id).then((inventory)=>{
                            // if inventory exists display it
                            if(inventory){
                                this.inventories.windows.push(this.id);
                            }else{
                                // create then display inventory
                                this.inventories.createInventory({id: this.id, width: this.attributes.width, height: this.attributes.height, filters:  this.attributes.filters ? this.attributes.filters : [], label: this.name}).then((inventory)=>{
                                    this.inventories.windows.push(this.id);
                                })
                            }

                        })
                    }
                }
            
        }
    }
}