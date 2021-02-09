import React from "react";
import { withAsyncAction } from "../../redux/HOCs";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      count: 0,
      picture: ''
    }
  }

  componentDidMount() {
    this.fetchMessages();
    this.getPicture();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload)
      this.setState({
        messages: res.payload.messages,
        count: res.payload.count
      })
    })
  }


  fetchPicture = () => {
    this.props.getPicture(this.props.username).then((res) => {
      console.log(res.payload)
      this.setState({
       picture: res.payload

      })
    })
  }


  


  getPicture = () => {
    this.props.getPicture(this.props.username)
     .then((res) => {
       console.log(res.payload)
       this.setState({
         picture: res.payload
       })


     }) 
       .catch((err) => {

      })


  }


  deleteMessage = (event) => {
    this.props.deleteMessage(event.target.id).then((res) => {
      this.fetchMessages();
    })
  }





  newMessageHandler = () => {
    let text = this.state.message;
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: ''
      })
    })
  }

  handleChange = (event) => {
    let data = {...this.state};
   
    data[event.target.name] = event.target.value;   

    this.setState(data);
  }





  render() {
    
    let display = (<div>No Messages Found</div>)
    if (this.state.messages) {
      display = (<img src= {this.state.messages} />) 
       
       display = this.state.messages.map((value) => {

        return (
            <div key={value.id + "s"}>
               <li key={value.id}>
                 {value.text}
                 <button key={value.id + "delete"} id={value.id} onClick={this.deleteMessage}>detelemsg</button>
                 </li>
            </div>
             
        );
      })
    }
     


    let pictureDisplay = (<div>Broken Image</div>)
    if (this.state.picture) {
      pictureDisplay = (<img src={this.state.picture} />)
    }
    

    return (
      <div className="Messages">
        <div className="Picture">
          {pictureDisplay}
        </div>
        <div className="ListMessage">
          {display}
        </div>
        <div className="NewMessage">
          <input name="message" onChange={this.handleChange} value={this.state.message}/>
          <button onClick={this.newMessageHandler}> Send Message </button>
        </div>
      </div>
    );
  }
}


export default withAsyncAction("profile", "all")(Messages);
