class IssueFilter extends React.Component{
  render(){
    return (
      <div>
        This is a place holder for  issues filter
      </div>
    );
  }
}

const sampleIssue = {
  status: "new",
  owner: 'Kenny',
  effort: 5,
  title : 'Newly Added'
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
    setTimeout(() => {
      this.props.createIssue(sampleIssue);
    }, 2000);
  }
  render(){

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = document.forms.issueAdd;
      const issue = {
        owner: form.owner.value,
        title: form.title.value
      };
      this.props.createIssue(issue);
      form.owner.value = "";
      form.title.value = "";
    };

    return (
      <form name="issueAdd" onSubmit={handleSubmit}>
        <input type="text" name="owner" placeholder="Owner"/>
        <input type="text" name="title" placeholder="Title"/>
        <button>Add</button>
      </form>
    );
  }
}


const initialIssues = [
  {
    id: 1,
    status: "new",
    owner: 'Kenny',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title : 'Error in console when clicking Add'
  },
  {
    id: 2,
    status: "old",
    owner: 'Kenny',
    effort: 1,
    created: new Date('2018-08-15'),
    due: undefined,
    title : 'Missing bottom border panel'
  }
];

const IssueRow = (props) => {
  const issue = props.issue;
  const get_color = (status) => {
    switch(status){
    case 'new':
      return 'blue';
    case 'old':
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

class IssueList extends React.Component {

  constructor(){
    super();
    this.state = { issues: []};
  }

  componentDidMount(){
    this.loadData();
  }


  loadData() {
    setTimeout(() => {
      this.setState({issues: initialIssues});
    }, 500); // 500 millisecond is reasonable to expect a real api call
  }

  render() {

    const createIssue = (issue)  =>{
      issue.id = this.state.issues.length + 1;
      issue.created = new Date();
      const newIssuesList = this.state.issues.slice();
      newIssuesList.push(issue);
      this.setState({issues: newIssuesList});
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
