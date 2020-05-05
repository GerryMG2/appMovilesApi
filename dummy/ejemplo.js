class Recuadro extends React.Component {
    render() {
      return <div onClick={this.props.onclick}>{this.props.color}</div>;
    }
  }
  
  class Papa extends React.Component {
    constructor(props) {
      super(props);
      this.state = { contador: 0, listaColor: [], color: "" };
      this.state.contador = 0;
      this.state.listaColor = ["Rojo", "Amarillo", "Azul"];
      this.state.color = "Rojo";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      let copystate = this.state;
      if (copystate.contador === 2) {
        copystate.contador = 0;
      } else {
        copystate.contador++;
      }
      copystate.color = copystate.listaColor[copystate.contador];
      this.setState(copystate);
    }
  
    render() {
      return (
        <div>
          <Recuadro color={this.state.color} onclick={() => this.handleClick()} />
        </div>
      );
    }
  }