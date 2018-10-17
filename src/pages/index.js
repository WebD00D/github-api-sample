import React, { Component } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
    }
  }

  componentDidMount() {
    const data = fetch(
      'https://api.github.com/repos/rails/rails/issues?state=open&sort=comments'
    ).then(response => {
      if (response.ok) {
        return response.json()
      }
    })

    data.then(d => {
      this.setState({
        issues: d,
      })
    })
  }

  render() {
    const issues =
      this.state.issues &&
      Object.keys(this.state.issues).map(key => {
        const issue = this.state.issues[key]
        return (
          <div key={key}>{issue.title}</div>
        )
      })

    return (
      <Layout>
        <h1>Github API Challenge</h1>
        {issues}
      </Layout>
    )
  }
}
