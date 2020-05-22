class IssueFilter extends React.Component{
  render(){
    return (
      <div>
        This is a place holder for  issues filter
      </div>
    );
  }
}

class IssueTable extends React.Component{
  render(){
    const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
    return (
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> Status </th>
            <th> Owner </th>
            <th> Created </th>
            <th> Effort </th>
            <th> Due Date </th>
            <th> Title </th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component{
  render(){
    return (
      <div>
        This is a place holder for a form to add an issue
      </div>
    );
  }
}


const issues = [
  {
    id: 1,
    status: "New",
    owner: 'Kenny',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title : 'Error in console when clicking Add'
  },
  {
    id: 2,
    status: "New",
    owner: 'Kenny',
    effort: 1,
    created: new Date('2018-08-15'),
    due: undefined,
    title : 'Missing bottom border panel'
  }
];

class IssueRow extends React.Component {
  render(){
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ' '}</td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr/>
        <IssueTable/>
        <hr/>
        <IssueAdd/>
        <hr/>
      </React.Fragment>
    );
  }
}



const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
