import React from 'react'
import Toolbar from 'react-big-calendar/lib/Toolbar'

export default class CustomToolbarUser extends Toolbar {
    componentDidMount() {
        const view = this.props.view
        console.log(view)
    }

    render() {
        return (
            <div className="row d-flex justify-content-end py-2">
                <div className="col-md-6 col-sm-12 text-right">
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
