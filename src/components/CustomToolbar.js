import React from 'react'
import Toolbar from 'react-big-calendar/lib/Toolbar'

export default class CustomToolbar extends Toolbar {
    componentDidMount() {
        const view = this.props.view
        console.log(view)
    }

    render() {
        return (
            <div className="row d-flex justify-content-between py-2">
                <div className="col-4">
                    <button class="btn btn-primary btn-rounded mx-1 px-4" onClick={() => this.navigate('TODAY')}>
                        Today
                    </button>
                    <button class="btn btn-secondary btn-rounded mr-1 px-4" onClick={() => this.navigate('PREV')}>
                        Back
                    </button>
                    <button class="btn btn-success btn-rounded mr-1 px-4" onClick={() => this.navigate('NEXT')}>
                        Next
                    </button>
                </div>
                <div className="col-4 text-center">
                    <div style={{ fontWeight: 'bold' }} className="mt-2">
                        {this.props.label}
                    </div>
                </div>
                <div className="col-4 text-right">
                    <button class="btn btn-primary btn-rounded mr-1 px-4" onClick={this.view.bind(null, 'month')}>
                        Month
                    </button>
                    <button class="btn btn-secondary btn-rounded mr-1 px-4" onClick={this.view.bind(null, 'day')}>
                        Day
                    </button>
                    <button class="btn btn-success btn-rounded mr-1 px-4" onClick={this.view.bind(null, 'agenda')}>
                        Agenda
                    </button>
                </div>
            </div>
        )
    }
}
