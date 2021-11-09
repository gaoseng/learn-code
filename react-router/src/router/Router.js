import React from 'react'

export const RouterContext = React.createContext();
export default class Router extends React.Component {

  state = {
    location: {
      pathname: location.pathname
    },
    setRoute: (pathname) => {
      console.log('pathname',pathname);
      this.setState({
        location: {
          pathname
        }
      })
    }
  }

  render() {
    console.log(this.state.location.pathname)
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}