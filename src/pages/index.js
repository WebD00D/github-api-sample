import React, { Component } from 'react'
import { Link } from 'gatsby'

import styled from 'react-emotion'
import Layout from '../components/layout'

const IssueCard = styled('a')`
  display: flex;
  align-items: center;
  padding: 12px;
  height: 32px;
  margin-bottom: 14px;
  -webkit-box-shadow: -1px 4px 5px 0px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: -1px 4px 5px 0px rgba(0, 0, 0, 0.33);
  box-shadow: -1px 4px 5px 0px rgba(0, 0, 0, 0.33);
  font-family: sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #000;
`

export default class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)

    this.state = {
      issues: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const data = fetch(
      'https://api.github.com/repos/rails/rails/issues?state=open&sort=comments&authorization_request=4b5293c7780fe502fdde75a36040126661663cac'
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

        console.log(this.state.issues[key]);

        const issue = this.state.issues[key]
        return <IssueCard href={issue.html_url} key={key}>{issue.title}</IssueCard>
      })

    return (
      <Layout>
        <h1>Github API Challenge</h1>
        {issues}
      </Layout>
    )
  }
}
