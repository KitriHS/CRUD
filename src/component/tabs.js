import React from 'react'

export default class extends React.Component {
    state = {
        activeTab: 0
    }
    render({ children, mobile } = this.props) {
        return (
            <div className="container-tab">
                <div className="tabs-container">
                    {children.map(({ props: { title } }, index) =>
                        <div className={["tab-non-active", index === this.state.activeTab ? "tab-active" : []].join(' ')} onClick={() => this.setState({ activeTab: index })} key={index}>
                            <p className={["tab-text-default", index === this.state.activeTab ? "tab-text" : []].join(' ')} style={mobile ? { padding: 10 } : { marginTop: 20 }}>
                                {title}
                            </p>
                        </div>
                    )}
                </div>
                <div className="container-tab">
                    {children[this.state.activeTab]}
                </div>
            </div>
        )
    }
}