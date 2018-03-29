export class Observable {

    private eventList: Array<any> = [];

    subscribe(key: string, fnc: Function) {

        // let exist = this.eventList.some(element => {
        //     return element.key === key;
        // });
        // if (!exist) {
        this.eventList.push({
            key: key,
            fnc: fnc
        })
        // }
    }

    publish(key: string, args: any) {
        this.eventList.forEach(evt => {
            if (evt.key === key) {
                evt.fnc(args);
            }
        });
    }

    unsubscribe(key: string) {
        let newList = this.eventList.map((evt) => {
            if (evt.key !== key) {
                return evt;
            }
        });
        this.eventList = newList;
    }


}