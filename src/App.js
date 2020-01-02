import React from 'react';
import './App.css'
import drawer from './libs/draw';

export default class App extends React.Component {

    state = {
        width: 120,
        height: 80,
        padding: 6,
        output: "",
        errors: []
    }

    /**
     * pixel translations
     * @type {string[]}
     */
    pixelEnum = [
        ' ',
        '-',
        '|'
    ];

    /**
     * Validate form inputs
     * @returns {boolean}
     */
    validate() {

        let errors = [], {width, height, padding} = this.state;

        if (width < 20) errors.push("Width value should be greater than 20.");
        if (Math.abs(width % 2) == 1) errors.push("Width value should be even.");

        if (height < 20) errors.push("Height value should be greater than 20.");
        if (Math.abs(height % 2) == 1) errors.push("Height value should be even.");

        if (padding < 4) errors.push("Padding value should be greater than or equal 4.");
        if (Math.abs(padding % 2) == 1) errors.push("Padding value should be even.");

        this.setState({errors});
        return errors.length ? false : true;
    }

    /**
     * Draw the result.
     * @param e
     * @returns {boolean}
     */
    draw(e) {

        if(e) e.preventDefault();

        let {width, height, padding} = this.state

        this.setState({
            width: parseInt(width),
            height: parseInt(height),
            padding: parseInt(padding)
        })

        if (!this.validate()) {
            return false;
        }

        let matrix = drawer(this.state.width, this.state.height, parseInt(this.state.padding));

        let output = matrix.map(row => row.map(item => this.pixelEnum[item]).join("")).join("\n")

        this.setState({output});
    }

    componentDidMount() {
        this.draw()
    }

    /**
     * Generate the form
     * @returns {*}
     */
    render() {

        let {width, height, padding, errors, output} = this.state;

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
                {errors.length ? <div className="errors active">
                    {
                        errors.map(error => {
                            return <p key={error}> {error} </p>
                        })
                    }
                </div> : null}
            </div>
        );
    }
}
