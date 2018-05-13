import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'

class Kmap extends React.Component{
    state = {
        k_nav:[
            {text:'分时',draw:false},
            {text:'1分',draw:false},
            {text:'5分钟',draw:false},
            {text:'15分钟',draw:false},
        ],
        choose:'分时'
    }
    componentDidMount(){
        console.log(1);
        this.draw()
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.choose != prevState.choose){
            const k_nav = this.state.k_nav;
            console.log(k_nav);
            this.draw()
            // if(!k_nav.draw){
            //     this.draw()
            // }
        }
    }
    draw(){
        window.a.宽 = document.body.clientWidth;
        window.a.高 = 200;
        window.a.画布id = "canvas1";
        window.a.上边距 = 40;
        window.a.类型 = this.state.choose;
        window.a.代码 ="sc1809";
        window.a.定时 =300;
        window.a.go();
    }
    choose = index => () =>{
        let k_nav = this.state.k_nav;
        k_nav[index]['draw'] = true;
        this.setState({
            k_nav:[...k_nav],
            choose:this.state.k_nav[index]
        })
    }
    render(){
        return(
            <div>
                <nav styleName="k-nav">
                    {this.state.k_nav.map((item,index) => (
                        <div style={item === this.state.choose ? {borderBottom:'1px solid #fff'} : {}} key={'k_nav_'+index} styleName="k-nav-item" onClick={this.choose(index)}>
                            {item.text}
                        </div>
                    ))}
                </nav>
                <canvas id="canvas1" style={{zoom:0.5}}></canvas>
            </div>
        )
    }
}

export default CSSModules(Kmap, styles)

