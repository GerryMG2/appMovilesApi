

class field extends React.component {
    constructor(props){
        super(props);
        this.state.value = props.datos;
        this.state.tipo = props.type;
        this.state.restricted = props.restricted;
        this.props.security = props.security;
        
    }




    render(){
        let variableText = "";
        switch (this.state.tipo) {
            case "Lista":
                variableText = `${this.state.value.length} Elementos`;
                break;
            case "Objeto":

                break;
            case "campo":
                if(this.state.restricted == "password"){
                    for (const iterator of this.state.value) {
                        variableText += "*";
                    }
                }else if(this.state.restricted == "target" ){
                    for (const iterator of this.state.value) {
                        variableText += "#";
                    }
                    variableText = variableText.slice(0,-4).concat(this.state.value.slice(-4));

                }else{
                    variableText = this.state.value;
                }
                
                break;      

            default:
                break;
        }

        return (
            <div></div>
        )
       
    }

}