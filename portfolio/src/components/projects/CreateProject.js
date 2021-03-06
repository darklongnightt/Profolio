import React, { Component } from "react";
import ReactQuill from "react-quill";

class CreateProject extends Component {
  state = {
    title: "",
    skills: "",
    content: "",
    error: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleTextChange = e => {
    this.setState({
      content: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Error checking before dispatching action and close modal
    if (
      this.state.title === "" ||
      this.state.skills === "" ||
      this.state.content === ""
    ) {
      this.setState({
        ...this.state,
        error: "All project fields are required."
      });
    } else {
      this.props.onCreate(this.state);
      this.setState({
        title: "",
        content: "",
        skills: "",
        error: ""
      });
    }
  };

  // To customize quill text editor
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }]
    ]
  };

  formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet"
  ];

  render() {
    return (
      <div className="section center">
        <form onSubmit={this.handleSubmit} className="white">
          <h5>Create Project</h5>
          <div className="grey-text">to be part of your Portfolio</div>
          <div className="input-field">
            <i className="material-icons prefix">title</i>
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">developer_board</i>
            <label htmlFor="skills">Skills Involved</label>
            <textarea
              id="skills"
              className="materialize-textarea"
              onChange={this.handleChange}
              value={this.state.skills}
            ></textarea>
          </div>

          <div className="input-field">
            <ReactQuill
              placeholder="Describe more about your project here."
              id="content"
              value={this.state.content}
              onChange={this.handleTextChange}
              modules={this.modules}
              formats={this.formats}
            />
          </div>

          <div className="red-text">{this.state.error}</div>
          <div className="input-field">
            <button className="btn z-depth-0 blue darken-2 form-btn waves-effect waves-light">
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProject;
