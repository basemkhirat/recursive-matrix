import React from 'react';
import './App.css'
import drawer from './libs/draw';

export default class App extends React.Component {

    state = {
        width: 140,
        height: 80,
        padding: 6,
        output: "",
        error: null
    }

    /**
     * pixel translation
     * @type {string[]}
     */
    pixelEnum = [
        ' ',
        '-',
        '|'
    ];

    /**
     * Draw the result.
     * @param e
     * @returns {boolean}
     */
    draw(e) {

        if (e) e.preventDefault();

        drawer(this.state.width, this.state.height, this.state.padding)
            .then(
                matrix => this.setState({
                    output: matrix.map(row => row.map(item => this.pixelEnum[item]).join("")).join("\n"),
                    error: null
                })
            )
            .catch(
                error => {
                    this.setState({error});
                }
            )
    }

    componentDidMount() {
        this.draw()
    }

    /**
     * Generate the form
     * @returns {*}
     */
    render() {

        let {width, height, padding, error, output} = this.state;

        return (
            <div className="wrapper">
                <div className="container">
                    <form className="form" onSubmit={e => this.draw(e)}>
                        <div className="input-group">
                            <label htmlFor="">Width</label>
                            <input type="text" defaultValue={width}
                                   onChange={e => this.setState({width: e.target.value})}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Height</label>
                            <input type="text" defaultValue={height}
                                   onChange={e => this.setState({height: e.target.value})}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Padding</label>
                            <input type="text" defaultValue={padding}
                                   onChange={e => this.setState({padding: e.target.value})}/>
                        </div>

                        <div className="input-submit">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <pre className="output">{output}</pre>
                {error ? <div className="errors">
                    <p>{error}</p>
                </div> : null}
            </div>
        );
    }
}
