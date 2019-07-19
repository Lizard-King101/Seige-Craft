export class Guns {
    guns = {
        m4a1: {
            name: 'm4a1',
            bullet_speed: 300,
            rpm: 600,
            mode: 'auto',
            select: ['semi','auto'],
            sound: 'rifle',
            recoilAngle: 0,
            maxRecoil: 10,
            shootDelay: 0,
            rotation: 0,
            capacity: 30,
            magazine: 30,
            canShoot: true,
            display: {
                left:{
                    deg: 25,
                    dist: 0
                },
                right: {
                    deg: 3,
                    dist: 10
                },
                muzzle: {
                    deg: 0,
                    dist: 30
                }
            },
            muzzle: {
                x: 0,
                y: 0
            }
        },
        mp5: {
            name: 'mp5',
            bullet_speed: 270,
            rpm: 900,
            mode: 'auto',
            select: ['semi','auto', 'burst'],
            sound: 'pistol',
            recoilAngle: 0,
            maxRecoil: 20,
            shootDelay: 0,
            rotation: 0,
            capacity: 30,
            magazine: 30,
            canShoot: true,
            display: {
                left:{
                    deg: 20,
                    dist: 0
                },
                right: {
                    deg: 3,
                    dist: 5
                },
                muzzle: {
                    deg: 0,
                    dist: 17
                }
            },
            muzzle: {
                x: 0,
                y: 0
            }
        },
        sks: {
            name: 'sks',
            bullet_speed: 500,
            rpm: 60,
            mode: 'semi',
            select: ['semi'],
            sound: 'rifle',
            recoilAngle: 0,
            maxRecoil: 40,
            shootDelay: 0,
            rotation: 0,
            capacity: 6,
            magazine: 6,
            canShoot: true,
            display: {
                left:{
                    deg: 5,
                    dist: 0
                },
                right: {
                    deg: 3,
                    dist: 10
                },
                muzzle: {
                    deg: 2,
                    dist: 35
                }
            },
            muzzle: {
                x: 0,
                y: 0
            }
        }
    };

    getGun(name: any, choose = false) {
        this.loadGuns();
        if(!choose){
            let index = Object.keys(this.guns).indexOf(name);
            if(index > -1){
                return this.guns[Object.keys(this.guns)[index]];
            }
        }else{
            let at = Object.keys(this.guns).indexOf(name);
            if(at + 1 >= Object.keys(this.guns).length){
                at = 0
            }else{
                at += 1
            }
            return this.guns[Object.keys(this.guns)[at]];
        }
    }

    loadGuns(){
        // load guns from json
    }
    
}