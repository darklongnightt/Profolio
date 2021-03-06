import React, { Component } from "react";
import ReactQuill from "react-quill";

class EditProject extends Component {
  state = {
    title: "",
    content: "",
    skills: "",
    error: "",
    id: ""
  };

  constructor(props) {
    super(props);
    const { project } = this.props;
    console.log(project);

    this.state = {
      title: project.title || "",
      content: project.content || "",
      skills: project.skills || "",
      id: project.id || "",
      createdAt: project.createdAt
    };
  }

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
      this.props.onEdit(this.state);
      this.props.onSetMode("VIEW");
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
    const { project, onDelete, onSetMode } = this.props;

    if (project) {
      return (
        <React.Fragment>
          <a
            href="#!"
            className="right grey-text text-darken-2 action-icon"
            onClick={() => onDelete(project.id)}
          >
            <i className="material-icons">delete</i>
          </a>
          <a
            href="#!"
            className="right blue-text action-icon"
            onClick={() => onSetMode("VIEW")}
          >
            <i className="material-icons">chrome_reader_mode</i>
          </a>

          <h5>Edit Project</h5>

          <br />
          <form onSubmit={this.handleSubmit} className="white">
            <div className="input-field">
              <i className="material-icons prefix">title</i>
              <label className="active" htmlFor="title">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>

            <div className="input-field">
              <i className="material-icons prefix">developer_board</i>
              <label className="active" htmlFor="skills">
                Skills Involved
              </label>
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

            <div className="input-field center">
              <button className="btn z-depth-0 blue darken-2 form-btn waves-effect waves-light">
                <i className="material-icons">send</i>
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <div className="container center">
          <div className="preloader-wrapper big active preloader-margin">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default EditProject;
