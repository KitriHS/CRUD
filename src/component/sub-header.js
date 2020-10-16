import React from 'react'

export default class extends React.Component {
    render(){
        const {title} = this.props
        return(
            <div className="form-heading-step"> 
                {title}
            </div>
        )
    }
}