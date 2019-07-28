import React from "react";

class Dominos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {}
        }
    }
    componentDidMount() {
        this.setState({
            obj: this.props.data
        })
    }
    render() {
        const { data } = this.props;
        return (
            <center>
                <div  style={{ borderColor: `${data.color}` }} className="hexagon" onClick={() => this.props.passCode(this.state.obj)}>
                    <div style={{ borderColor: `${data.color}` }} className="hexTop">
                        <span value={data.id} style={{ height: '5px', width: '5px', paddingLeft: '5px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.topLeft}</span>
                        <span style={{ height: '5px', width: '5px', position: 'absolute', top: '-22px', paddingLeft: '45px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.middleLeft}</span>
                        <span style={{ height: '5px', width: '5px', marginLeft: '87px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.topRight}</span>
                    </div>
                    <div style={{ borderColor: `${data.color}` }} className="hexBottom">
                        <span style={{ height: '5px', width: '5px', paddingTop: '42px', paddingLeft: '4px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.bottomLeft}</span>
                        <span style={{ height: '5px', width: '5px', paddingTop: '63px', paddingLeft: '43px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.middleRight}</span>
                        <span style={{ height: '5px', width: '5px', paddingLeft: '80px', paddingTop: '42px', fontSize: 'larger', fontWeight: 'bold', color: 'black' }}>{data.bottomRight}</span>
                    </div>
                </div>
                <br />
            </center>
        );
    }
}

export default Dominos;
