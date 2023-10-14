export const AppCounter = (props: { title: string, value: number,type:string, isRunning:boolean,setter: (v:number)=>void }) => { 
    
    return (
        <div>
            <div id={props.type+"-label"}>{props.title}</div>
            <button
                id={props.type+"-decrement"}
                disabled={props.isRunning}
                onClick={() => {
                    if(props.value > 1)
                        props.setter(props.value - 1);
                }}
            >
                {"<"}
            </button>
            <label id={props.type + "-length"}>{props.value}</label>
            <button
                id={props.type + "-increment"}
                disabled={props.isRunning}
                onClick={() => {
                    if(props.value<60)
                    props.setter(props.value + 1);
                }}
            >
                {">"}
            </button>
        </div>
    );

};

export default AppCounter;