const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


class IssueFilter extends React.Component{
  render(){
    return (
      <div> This is a place holder for  issues filter </div>
    );
  }
}

const IssueRow = (props) => {
  const issue = props.issue;
  const get_color = (status) => {
    switch(status){
    case 'New':
      return 'blue';
    case 'Old':
      return 'red';
    default:
      return 'black';
    }
  };

  return (
    <tr style={{color: get_color(issue.status)}}>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
    </tr>
  );
};

const IssueTable = (props) => {

  const issueRows = props.issues.map(
    issue => <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
};

class IssueAdd extends React.Component{

  constructor(){
    super();
  }

  render(){

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = document.forms.issueAdd;
      const issue = {
        owner: form.owner.value,
        title: form.title.value,
        due: new Date(new Date().getTime() + 1000*60*60*24*10),
      };
      this.props.createIssue(issue);
      form.owner.value = "";
      form.title.value = "";
    };


    return (
      <form name="issueAdd" onSubmit={handleSubmit}>
        <input type="text" name="owner" placeholder="Owners"/>
        <input type="text" name="title" placeholder="Title"/>
        <button>Add</button>
      </form>
    );
  }
}


class IssueList extends React.Component {

  constructor(){
    super();
    this.state = { issues: []};
  }

  componentDidMount(){
    this.loadData();
  };


  async loadData() {

    const query = `query{
      issueList{
        id title status owner
        created effort due
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query }),
    });

    const body = await response.text();
    const result =  JSON.parse(body, jsonDateReviver);
    this.setState({ issues: result.data.issueList });
  }

  render() {

    const createIssue = async (issue) => {


      const query = `mutation issueAdd ($issue: IssueInputs!){
        issueAdd(issue: $issue) {
          id
        }
      }`;

      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables: {issue}})
      })
      console.log(response)
      this.loadData()
    };

    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr/>
        <IssueTable issues={this.state.issues}/>
        <hr/>
        <IssueAdd createIssue={createIssue}/>
        <hr/>
      </React.Fragment>
    );
  }
}



const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
